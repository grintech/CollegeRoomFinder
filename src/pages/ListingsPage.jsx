import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, Autocomplete } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Star,
  Home,
  Filter,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Clock,
  Search,
  X
} from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ListingsPage.css';
import api from '../services/api';

// Define libraries as a constant outside the component
const GOOGLE_MAPS_LIBRARIES = ['places'];

// Google Maps container style
const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

// Default center (will be updated based on listings)
const defaultCenter = {
  lat: 39.2904,
  lng: -76.6122
};

// Map options
const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: true,
  streetViewControl: true,
  fullscreenControl: true,
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    }
  ]
};

// Lease duration options
const leaseDurationOptions = [
  { value: "", label: "Select Lease Duration" },
  { value: "academic-year", label: "Academic Year" },
  { value: "fall-semester", label: "Fall Semester" },
  { value: "spring-semester", label: "Spring Semester" },
  { value: "summer-semester", label: "Summer Semester" },
  { value: "winter-semester", label: "Winter Semester" }
];

export const ListingsPage = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [mapsError, setMapsError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    price: '',
    bedrooms: '',
    bathrooms: '',
    campus_id: '',
    category_id: '',
    lease_duration: ''
  });
  const [filterOptions, setFilterOptions] = useState({
    campuses: [],
    categories: [],
    lease_durations: []
  });
  const [hoveredListing, setHoveredListing] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  const autocompleteRef = useRef(null);
  const mobileAutocompleteRef = useRef(null);
  const searchInputRef = useRef(null);
  const mobileSearchInputRef = useRef(null);

  // Google Maps API key
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Fetch listings
  useEffect(() => {
    fetchListings();
  }, []);

  // Log API key status
  useEffect(() => {
    if (!googleMapsApiKey) {
      console.error('Google Maps API key is missing. Please check your .env file.');
      setMapsError('Google Maps API key is missing. Please check your environment configuration.');
    } else {
      console.log('Google Maps API key is configured');
    }
  }, [googleMapsApiKey]);

  // Debug listings with coordinates
  useEffect(() => {
    if (listings.length > 0) {
      const withCoords = listings.filter(l => l.latitude && l.longitude);
      console.log(`Listings with coordinates: ${withCoords.length}/${listings.length}`);
      
      if (withCoords.length === 0) {
        console.warn('No listings have valid coordinates!');
      } else {
        // Log sample coordinates
        withCoords.slice(0, 3).forEach(l => {
          console.log(`${l.title}: lat=${l.latitude}, lng=${l.longitude}`);
        });
      }
    }
  }, [listings]);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/listings?per_page=50`);
      
      if (response.data.status) {
        const listingsData = response.data.data.listings;
        const filtersData = response.data.data.filters;
        
        const listingsWithCoords = listingsData.map(listing => ({
          ...listing,
          latitude: listing.latitude ? parseFloat(listing.latitude) : null,
          longitude: listing.longitude ? parseFloat(listing.longitude) : null
        }));
        
        setListings(listingsWithCoords);
        setFilteredListings(listingsWithCoords);
        
        setFilterOptions({
          campuses: filtersData.campuses || [],
          categories: filtersData.categories || [],
          lease_durations: filtersData.lease_durations || []
        });
      }
    } catch (err) {
      setError('Failed to fetch listings');
      console.error('Error fetching listings:', err);
    } finally {
      setLoading(false);
    }
  };

  const onMapLoad = useCallback((map) => {
    setMapRef(map);
    
    // Fit bounds to show all markers
    if (filteredListings.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      let hasValidCoords = false;
      
      filteredListings.forEach(listing => {
        if (listing.latitude && listing.longitude) {
          bounds.extend({ lat: listing.latitude, lng: listing.longitude });
          hasValidCoords = true;
        }
      });
      
      if (hasValidCoords) {
        map.fitBounds(bounds);
      }
    }
  }, [filteredListings]);

  const onLoadScript = useCallback(() => {
    console.log('Google Maps script loaded successfully');
    setMapsLoaded(true);
    setMapsError(null);
  }, []);

  const onLoadScriptError = useCallback((error) => {
    console.error('Google Maps script failed to load:', error);
    setMapsError('Failed to load Google Maps. Please check your API key and ensure billing is enabled.');
  }, []);

  // Handle place selection from autocomplete (desktop)
  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      console.log('Place selected:', place);
      
      if (place && place.formatted_address) {
        setSearchInput(place.formatted_address);
        handlePlaceSelection(place);
      }
    }
  };

  // Handle place selection from mobile autocomplete
  const handleMobilePlaceChanged = () => {
    if (mobileAutocompleteRef.current) {
      const place = mobileAutocompleteRef.current.getPlace();
      console.log('Mobile place selected:', place);
      
      if (place && place.formatted_address) {
        setSearchInput(place.formatted_address);
        handlePlaceSelection(place);
        setShowFilters(false); // Close modal after selection
      }
    }
  };

  // Common function to handle place selection
  const handlePlaceSelection = (place) => {
    // If place has geometry, use geolocation for more accurate filtering
    if (place.geometry && place.geometry.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      console.log('Place coordinates:', lat, lng);
      
      // Try with a larger radius first (100km)
      filterByGeolocation(lat, lng, 100);
    } else {
      // Fallback to text-based filtering
      let city = '';
      let state = '';
      let country = '';
      
      if (place.address_components) {
        place.address_components.forEach((component) => {
          const types = component.types;
          
          if (types.includes('locality') || types.includes('sublocality') || types.includes('neighborhood')) {
            city = component.long_name;
          }
          if (types.includes('administrative_area_level_1')) {
            state = component.long_name;
          }
          if (types.includes('country')) {
            country = component.long_name;
          }
        });
      }
      
      filterBySelectedLocation(city, state, country, place.formatted_address);
    }
    
    setCurrentPage(1);
  };

  const filterBySelectedLocation = (selectedCity, selectedState, selectedCountry, formattedAddress) => {
    // If no location components, fall back to text search
    if (!selectedCity && !selectedState && !selectedCountry) {
      filterByLocation(formattedAddress);
      return;
    }

    const searchTerms = [
      selectedCity?.toLowerCase(),
      selectedState?.toLowerCase(),
      selectedCountry?.toLowerCase(),
      formattedAddress?.toLowerCase()
    ].filter(Boolean);

    const filtered = listings.filter(listing => {
      const listingCity = listing.city?.toLowerCase() || '';
      const listingState = listing.state?.toLowerCase() || '';
      const listingCountry = listing.country?.toLowerCase() || '';
      const listingAddress = listing.address?.toLowerCase() || '';
      const listingTitle = listing.title?.toLowerCase() || '';

      return searchTerms.some(term => 
        listingCity.includes(term) ||
        listingState.includes(term) ||
        listingCountry.includes(term) ||
        listingAddress.includes(term) ||
        listingTitle.includes(term)
      );
    });
    
    console.log(`Found ${filtered.length} listings for selected location`);
    setFilteredListings(filtered);
    
    // Update map bounds to show filtered listings
    if (mapRef && filtered.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      filtered.forEach(listing => {
        if (listing.latitude && listing.longitude) {
          bounds.extend({ lat: listing.latitude, lng: listing.longitude });
        }
      });
      mapRef.fitBounds(bounds);
    } else if (mapRef) {
      // If no listings found, reset to default view
      mapRef.setZoom(4);
      mapRef.panTo(defaultCenter);
    }
  };

  const filterByLocation = (location) => {
    const searchTerm = location.toLowerCase();
    const filtered = listings.filter(listing => 
      listing.city?.toLowerCase().includes(searchTerm) ||
      listing.state?.toLowerCase().includes(searchTerm) ||
      listing.country?.toLowerCase().includes(searchTerm) ||
      listing.address?.toLowerCase().includes(searchTerm) ||
      listing.title?.toLowerCase().includes(searchTerm)
    );
    
    console.log(`Found ${filtered.length} listings for search: "${location}"`);
    setFilteredListings(filtered);
    
    if (mapRef && filtered.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      filtered.forEach(listing => {
        if (listing.latitude && listing.longitude) {
          bounds.extend({ lat: listing.latitude, lng: listing.longitude });
        }
      });
      mapRef.fitBounds(bounds);
    }
  };

  const filterByGeolocation = async (latitude, longitude, radius = 50) => {
    console.log('Filtering by geolocation:', { latitude, longitude, radius });
    console.log('Total listings:', listings.length);
    
    // First try with coordinates
    const filtered = listings.filter(listing => {
      if (!listing.latitude || !listing.longitude) return false;
      
      const distance = calculateDistance(
        latitude, 
        longitude, 
        listing.latitude, 
        listing.longitude
      );
      
      return distance <= radius;
    });
    
    console.log(`Found ${filtered.length} listings within ${radius}km using coordinates`);
    
    if (filtered.length > 0) {
      setFilteredListings(filtered);
      
      if (mapRef) {
        const bounds = new window.google.maps.LatLngBounds();
        filtered.forEach(listing => {
          if (listing.latitude && listing.longitude) {
            bounds.extend({ lat: listing.latitude, lng: listing.longitude });
          }
        });
        mapRef.fitBounds(bounds);
      }
      return;
    }
    
    // If no results, try to get city/state from coordinates and do text search
    console.log('No listings found with coordinates, trying reverse geocoding...');
    const location = await getLocationFromCoordinates(latitude, longitude);
    console.log('Reverse geocoded location:', location);
    
    if (location.city || location.state) {
      const textFiltered = listings.filter(listing => {
        const listingCity = listing.city?.toLowerCase() || '';
        const listingState = listing.state?.toLowerCase() || '';
        const searchCity = location.city?.toLowerCase() || '';
        const searchState = location.state?.toLowerCase() || '';
        
        return listingCity.includes(searchCity) || listingState.includes(searchState);
      });
      
      console.log(`Found ${textFiltered.length} listings using text search`);
      setFilteredListings(textFiltered);
      
      if (mapRef && textFiltered.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        textFiltered.forEach(listing => {
          if (listing.latitude && listing.longitude) {
            bounds.extend({ lat: listing.latitude, lng: listing.longitude });
          }
        });
        mapRef.fitBounds(bounds);
      } else if (mapRef) {
        mapRef.panTo({ lat: latitude, lng: longitude });
        mapRef.setZoom(10);
      }
    }
  };

  // Helper function to calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return distance;
  };

  const getLocationFromCoordinates = async (lat, lng) => {
    try {
      const geocoder = new window.google.maps.Geocoder();
      const response = await new Promise((resolve, reject) => {
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          if (status === 'OK' && results[0]) {
            resolve(results[0]);
          } else {
            reject(status);
          }
        });
      });
      
      let city = '';
      let state = '';
      let country = '';
      
      response.address_components.forEach(component => {
        const types = component.types;
        if (types.includes('locality') || types.includes('sublocality')) {
          city = component.long_name;
        }
        if (types.includes('administrative_area_level_1')) {
          state = component.long_name;
        }
        if (types.includes('country')) {
          country = component.long_name;
        }
      });
      
      return { city, state, country };
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
      return { city: '', state: '', country: '' };
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => {
      const newFilters = {
        ...prev,
        [name]: value
      };
      
      applyFilters(newFilters);
      setCurrentPage(1);
      
      return newFilters;
    });
  };

  const applyFilters = (currentFilters) => {
    let filtered = [...listings];

    if (currentFilters.price) {
      const [min, max] = currentFilters.price.split('-').map(val => 
        val === '5000+' ? 5000 : parseInt(val)
      );
      filtered = filtered.filter(listing => {
        const price = parseFloat(listing.price);
        if (max) {
          return price >= min && price <= max;
        } else {
          return price >= min;
        }
      });
    }

    if (currentFilters.bedrooms) {
      filtered = filtered.filter(listing => 
        listing.bedrooms >= parseInt(currentFilters.bedrooms)
      );
    }

    if (currentFilters.bathrooms) {
      filtered = filtered.filter(listing => 
        listing.bathrooms >= parseFloat(currentFilters.bathrooms)
      );
    }

    if (currentFilters.campus_id) {
      filtered = filtered.filter(listing => 
        listing.campus?.id === parseInt(currentFilters.campus_id)
      );
    }

    if (currentFilters.category_id) {
      filtered = filtered.filter(listing => 
        listing.category?.id === parseInt(currentFilters.category_id)
      );
    }

    if (currentFilters.lease_duration) {
      filtered = filtered.filter(listing => 
        listing.lease_duration === currentFilters.lease_duration
      );
    }

    setFilteredListings(filtered);
    
    if (mapRef && filtered.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      filtered.forEach(listing => {
        if (listing.latitude && listing.longitude) {
          bounds.extend({ lat: listing.latitude, lng: listing.longitude });
        }
      });
      mapRef.fitBounds(bounds);
    }
  };

  const handleMarkerClick = (listing) => {
    setSelectedListing(listing);
    if (mapRef && listing.latitude && listing.longitude) {
      mapRef.panTo({ lat: listing.latitude, lng: listing.longitude });
      mapRef.setZoom(15);
    }
  };

  const handleListingHover = (listing) => {
    setHoveredListing(listing);
  };

  const handleListingLeave = () => {
    setHoveredListing(null);
  };

  const handleViewDetails = (slug) => {
    window.open(`/property/${slug}`, '_blank');
  };

  const clearSearch = () => {
    setSearchInput('');
    setFilteredListings(listings);
    setCurrentPage(1);
    
    if (mapRef && listings.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      listings.forEach(listing => {
        if (listing.latitude && listing.longitude) {
          bounds.extend({ lat: listing.latitude, lng: listing.longitude });
        }
      });
      mapRef.fitBounds(bounds);
    }
  };

  const clearAllFilters = () => {
    setFilters({
      price: '',
      bedrooms: '',
      bathrooms: '',
      campus_id: '',
      category_id: '',
      lease_duration: ''
    });
    setFilteredListings(listings);
    setSearchInput('');
    setCurrentPage(1);
    setShowFilters(false);
  };

  // Get current page listings
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentListings = filteredListings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);

  // Enhanced marker icon with price-based colors and better visibility
  const getMarkerIcon = (listing, isHovered = false) => {
    if (!window.google || !window.google.maps) return null;

    const isSelected = selectedListing?.id === listing.id;
    const isHoveredState = hoveredListing?.id === listing.id;
    const price = parseFloat(listing.price);
    
    // Determine color based on price
    let color;
    if (isSelected || isHoveredState) {
      color = '#4285F4'; // Google Blue for selected/hovered
    } else if (price < 1500) {
      color = '#0F9D58'; // Green for affordable
    } else if (price > 3000) {
      color = '#DB4437'; // Red for expensive
    } else {
      color = '#F4B400'; // Yellow for mid-range
    }
    
    // Create a custom SVG marker with a pin shape for better visibility
    const svgMarker = {
      path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
      fillColor: color,
      fillOpacity: 1,
      strokeColor: '#FFFFFF',
      strokeWeight: 2,
      scale: isHoveredState || isSelected ? 1.5 : 1.2,
      anchor: new window.google.maps.Point(12, 22),
      labelOrigin: new window.google.maps.Point(12, 12)
    };
    
    return svgMarker;
  };

  return (
    <div className="listings-page">
      {/* Mobile Filter Button */}
      <div className="mobile-filter-btn d-lg-none ">
        <button 
          className="btn btn-primary w-100"
          onClick={() => setShowFilters(true)}
        >
          <Filter size={18} className="me-2" />
          Filter Properties
        </button>
      </div>

      {/* Mobile Filter Modal with Search */}
      {showFilters && (
        <div className="filter-modal ">
          <div className="filter-modal-content">
            <div className="filter-modal-header">
              <h5>Filter Properties</h5>
              <button className="btn-close" onClick={() => setShowFilters(false)}></button>
            </div>
            <div className="filter-modal-body">
              {/* Search Input in Mobile Modal */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Location</label>
                {mapsLoaded ? (
                  <Autocomplete
                    onLoad={(autocomplete) => {
                      mobileAutocompleteRef.current = autocomplete;
                    }}
                    onPlaceChanged={handleMobilePlaceChanged}
                  >
                    <div className="position-relative">
                      <Search size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                      <input
                        type="text"
                        className="form-control ps-5"
                        placeholder="Search by city, state, or address..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        ref={mobileSearchInputRef}
                      />
                      {searchInput && (
                        <button 
                          className="position-absolute top-50 end-0 translate-middle-y btn btn-link text-muted p-0 me-3"
                          onClick={clearSearch}
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  </Autocomplete>
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Loading search..."
                    disabled
                  />
                )}
              </div>

              <div className="row">
                <div className="col-6 col-md-3">
                  <select name="price" className="form-select mb-3" value={filters.price} onChange={handleFilterChange}>
                    <option value="">$ Price</option>
                    <option value="0-1500">$0 - $1,500</option>
                    <option value="1500-2000">$1,500 - $2,000</option>
                    <option value="2000-3000">$2,000 - $3,000</option>
                    <option value="3000-5000">$3,000 - $5,000</option>
                    <option value="5000+">$5,000+</option>
                  </select>
                </div>
                <div className="col-6 col-md-3">
                  <select name="bedrooms" className="form-select mb-3" value={filters.bedrooms} onChange={handleFilterChange}>
                    <option value="">Beds</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>
                <div className="col-6 col-md-3">
                  <select name="bathrooms" className="form-select mb-3" value={filters.bathrooms} onChange={handleFilterChange}>
                    <option value="">Baths</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>
                <div className="col-6 col-md-3">
                  <select name="campus_id" className="form-select mb-3" value={filters.campus_id} onChange={handleFilterChange}>
                    <option value="">All Campuses</option>
                    {filterOptions.campuses.map(campus => (
                      <option key={campus.id} value={campus.id}>{campus.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <select name="category_id" className="form-select mb-3" value={filters.category_id} onChange={handleFilterChange}>
                    <option value="">All Categories</option>
                    {filterOptions.categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <select 
                    name="lease_duration" 
                    className="form-select mb-3" 
                    value={filters.lease_duration} 
                    onChange={handleFilterChange}
                  >
                    {leaseDurationOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="filter-modal-footer">
              <button className="btn btn-secondary" onClick={clearAllFilters}>
                Clear All
              </button>
              <button className="btn btn-primary" onClick={() => setShowFilters(false)}>
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="main-content">
        {/* Map Section */}
        <div className="map-section">
          {/* Filter Bar - Desktop */}
          <div className="filter-bar1 d-none d-lg-block">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="filter-container">
                    <div className="row g-2">
                      <div className="col-lg-6">
                        {mapsLoaded ? (
                          <Autocomplete
                            onLoad={(autocomplete) => {
                              autocompleteRef.current = autocomplete;
                            }}
                            onPlaceChanged={handlePlaceChanged}
                          >
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control search-input ps-5"
                                placeholder="Search by city, state, or address..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                ref={searchInputRef}
                              />
                              {searchInput && (
                                <button 
                                  className="position-absolute top-50 end-0 translate-middle-y btn btn-link text-muted p-0 me-3"
                                  onClick={clearSearch}
                                >
                                  <X size={16} />
                                </button>
                              )}
                            </div>
                          </Autocomplete>
                        ) : (
                          <div className="position-relative">
                            <Search size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                            <input
                              type="text"
                              className="form-control search-input ps-5"
                              placeholder="Loading search..."
                              disabled
                            />
                          </div>
                        )}
                      </div>
                      <div className="col-lg-2">
                        <select name="price" className="form-select filter-select" value={filters.price} onChange={handleFilterChange}>
                          <option value="">$ Price</option>
                          <option value="0-1500">$0 - $1,500</option>
                          <option value="1500-2000">$1,500 - $2,000</option>
                          <option value="2000-3000">$2,000 - $3,000</option>
                          <option value="3000-5000">$3,000 - $5,000</option>
                          <option value="5000+">$5,000+</option>
                        </select>
                      </div>
                      <div className="col-lg-2">
                        <select name="bedrooms" className="form-select filter-select" value={filters.bedrooms} onChange={handleFilterChange}>
                          <option value="">Beds</option>
                          <option value="1">1+</option>
                          <option value="2">2+</option>
                          <option value="3">3+</option>
                          <option value="4">4+</option>
                        </select>
                      </div>
                      <div className="col-lg-2">
                        <select name="bathrooms" className="form-select filter-select" value={filters.bathrooms} onChange={handleFilterChange}>
                          <option value="">Baths</option>
                          <option value="1">1+</option>
                          <option value="2">2+</option>
                          <option value="3">3+</option>
                          <option value="4">4+</option>
                        </select>
                      </div>
                      <div className="col-lg-4">
                        <select name="campus_id" className="form-select filter-select" value={filters.campus_id} onChange={handleFilterChange}>
                          <option value="">All Campuses</option>
                          {filterOptions.campuses.map(campus => (
                            <option key={campus.id} value={campus.id}>{campus.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-lg-4">
                        <select name="category_id" className="form-select filter-select category-select" value={filters.category_id} onChange={handleFilterChange}>
                          <option value="">All Categories</option>
                          {filterOptions.categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-lg-4">
                        <select 
                          name="lease_duration" 
                          className="form-select filter-select lease-select" 
                          value={filters.lease_duration} 
                          onChange={handleFilterChange}
                        >
                          {leaseDurationOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {googleMapsApiKey ? (
            <LoadScript 
              googleMapsApiKey={googleMapsApiKey}
              onLoad={onLoadScript}
              onError={onLoadScriptError}
              libraries={GOOGLE_MAPS_LIBRARIES}
              loadingElement={
                <div className="map-loading">
                  <div className="spinner"></div>
                  <p>Loading Google Maps...</p>
                </div>
              }
            >
              {mapsLoaded && !mapsError ? (
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={defaultCenter}
                  zoom={4}
                  options={mapOptions}
                  onLoad={onMapLoad}
                >
                  {filteredListings.map((listing) => {
                    if (!listing.latitude || !listing.longitude) {
                      return null;
                    }
                    
                    return (
                      <Marker
                        key={listing.id}
                        position={{ lat: listing.latitude, lng: listing.longitude }}
                        icon={getMarkerIcon(listing)}
                        onClick={() => handleMarkerClick(listing)}
                        onMouseOver={() => handleListingHover(listing)}
                        onMouseOut={handleListingLeave}
                      />
                    );
                  })}

                  {selectedListing && selectedListing.latitude && selectedListing.longitude && (
                    <InfoWindow
                      position={{ lat: selectedListing.latitude, lng: selectedListing.longitude }}
                      onCloseClick={() => setSelectedListing(null)}
                    >
                      <div className="map-info-window">
                        <img 
                          src={selectedListing.primary_image || 'https://via.placeholder.com/200x120'} 
                          alt={selectedListing.title}
                        />
                        <div className="info-window-content">
                          <h6>{selectedListing.price_formatted}/mo</h6>
                          <p className="title text-dark fw-bold">{selectedListing.title}</p>
                          <p className="location">
                            <MapPin size={14} />
                            {selectedListing.address}
                          </p>
                          <div className="features">
                            <span><Bed size={14} /> {selectedListing.bedrooms}</span>
                            <span><Bath size={14} /> {selectedListing.bathrooms}</span>
                          </div>
                          <button 
                            className="view-details-btn"
                            onClick={() => handleViewDetails(selectedListing.slug)}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              ) : (
                <div className="map-error">
                  <AlertCircle size={48} className="mb-3 text-danger" />
                  <h5>Map Loading Error</h5>
                  <p className="text-muted">{mapsError || 'Unable to load Google Maps'}</p>
                  <button 
                    className="btn btn-primary mt-3"
                    onClick={() => window.location.reload()}
                  >
                    Retry
                  </button>
                </div>
              )}
            </LoadScript>
          ) : (
            <div className="map-error">
              <AlertCircle size={48} className="mb-3 text-danger" />
              <h5>Google Maps API Key Missing</h5>
              <p className="text-muted">Please add your Google Maps API key to the .env file</p>
            </div>
          )}
        </div>

        {/* Listings Panel */}
        <div className="listings-panel">
          <div className="panel-header">
            <h2>Available Properties</h2>
            <span className="results-count">{filteredListings.length} results</span>
          </div>
          
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading listings...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <p>{error}</p>
              <button onClick={fetchListings} className="btn btn-primary">Retry</button>
            </div>
          ) : (
            <>
              <div className="properties-grid">
                {currentListings.length > 0 ? (
                  currentListings.map((listing) => (
                    <div 
                      key={listing.id} 
                      className={`property-card ${selectedListing?.id === listing.id ? 'selected' : ''} ${hoveredListing?.id === listing.id ? 'hovered' : ''}`}
                      onMouseEnter={() => handleListingHover(listing)}
                      onMouseLeave={handleListingLeave}
                      onClick={() => handleMarkerClick(listing)}
                    >
                      <div className="property-image-wrapper">
                        <img 
                          src={listing.primary_image || '/images/image_not_found.png'} 
                          alt={listing.title}
                          className="property-image"
                        />
                        {listing.is_featured && (
                          <span className="featured-badge">
                            <Star size={12} /> Featured
                          </span>
                        )}
                        <span className="property-type1">{listing.category?.name || 'Property'}</span>
                      </div>
                      
                      <div className="property-details">
                        <h3 className="property-price">{listing.price_formatted} <span>/month</span></h3>
                        <h4 className="property-title">{listing.title}</h4>
                        
                        <p className="property-location">
                          <MapPin size={14} className="icon" />
                          {listing.address} 
                        </p>
                        
                        <div className="property-features">
                          <span>
                            <Bed size={14} className="icon" />
                            {listing.bedrooms} {listing.bedrooms === 1 ? 'bed' : 'beds'}
                          </span>
                          <span>
                            <Bath size={14} className="icon" />
                            {listing.bathrooms} {listing.bathrooms === 1 ? 'bath' : 'baths'}
                          </span>
                          <span className='text-capitalize'>
                            <Clock size={14} className="icon" />
                            {listing?.lease_duration?.replace(/-/g, ' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-results">
                    <Home size={48} />
                    <h5>No Properties Found</h5>
                    <p>Try adjusting your search or filters to find more properties.</p>
                    <button 
                      className="blue_btn"
                      onClick={clearAllFilters}
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {filteredListings.length > itemsPerPage && (
                <div className="pagination-container">
                  <button 
                    className="btn btn-outline-primary pagination-btn"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="page-info">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button 
                    className="btn btn-outline-primary pagination-btn"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};