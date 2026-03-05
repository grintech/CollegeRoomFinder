
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import L from "leaflet";

const purpleIcon = new L.Icon({
  iconUrl:
    "https://maps.gstatic.com/mapfiles/ms2/micons/purple-dot.png",
  iconSize: [32, 32],
});

const properties = [
  {
    id: 1,
    price: 1500,
    beds: 2,
    baths: 2,
    lat: 39.27,
    lng: -76.61,
    title: "2BR Apartment in Baltimore",
    address: "422 W Franklin St, Baltimore",
  },
  {
    id: 2,
    price: 2200,
    beds: 3,
    baths: 2,
    lat: 39.30,
    lng: -76.63,
    title: "3BR Townhouse",
    address: "3807 Bowers Ave, Baltimore",
  },
];


export const ListingsPage = () => {
   return (
    <div className="listing-page">

      {/* FILTER BAR */}
      <div className="filter-bar shadow-sm">
        <div className="container-fluid">
          <div className="d-flex gap-3">

            <input
              className="form-control"
              placeholder="Enter location"
            />

            <select className="form-select w-auto">
              <option>Price</option>
            </select>

            <select className="form-select w-auto">
              <option>Beds</option>
            </select>

            <select className="form-select w-auto">
              <option>Baths</option>
            </select>

          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="container-fluid">
        <div className="row">

          {/* MAP */}
          <div className="col-md-8 p-0 map-section map-wrapper">

            <MapContainer
              center={[39.27, -76.61]}
              zoom={12}
              style={{ height: "90vh", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {properties.map((p) => (
                <Marker position={[p.lat, p.lng]} icon={purpleIcon}>
                  <Popup>
                    <b>${p.price}</b>
                    <br />
                    {p.title}
                  </Popup>
                </Marker>
              ))}

            </MapContainer>

          </div>

          {/* LISTINGS */}
          <div className="col-md-4 listings-panel">

            <h5 className="mb-3">573 Properties</h5>

            {properties.map((p) => (
              <div className="card mb-3 listing-card" key={p.id}>

                <div className="card-body">

                  <div className="listing-img"></div>

                  <h5>${p.price}/mo</h5>

                  <p className="mb-1">{p.title}</p>

                  <small className="text-muted">
                    {p.address}
                  </small>

                  <div className="text-muted mt-2">
                    {p.beds} beds • {p.baths} baths
                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>
      </div>

    </div>
  );
}
