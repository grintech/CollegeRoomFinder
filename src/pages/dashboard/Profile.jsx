import DashSidebar from "./DashSidebar";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useAuth } from "../../context/AuthContext";
import { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";

const Profile = () => {
  const fileInputRef = useRef(null);
  const { user, token } = useAuth();
  
  const [profileImage, setProfileImage] = useState("/images/default_img.png");
  const [profileFile, setProfileFile] = useState(null);
  const [imageRemoved, setImageRemoved] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [fetchingProfile, setFetchingProfile] = useState(true);

  // Form data state
  const [formData, setFormData] = useState({
    phone: "",
    date_of_birth: "",
    gender: "",
    address: "",
    graduation_year: "",
    university: "",
    course: "",
    bio: "",
    linkedin_url: "",
    facebook_url: "",
    instagram_url: "",
    twitter_url: ""
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password: "",
    new_password_confirmation: ""
  });

  // Function to format date for input field (YYYY-MM-DD)
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    
    try {
      // Handle ISO format: "1998-03-15T00:00:00.000000Z"
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";
      
      // Format as YYYY-MM-DD for input type="date"
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  };

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setFetchingProfile(true);
        const response = await api.get('/get/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.status === true) {
          const profileData = response.data.data.profile;
          console.log("Profile data:", profileData);
          
          setFormData({
            phone: profileData.phone || "",
            date_of_birth: formatDateForInput(profileData.date_of_birth),
            gender: profileData.gender || "",
            address: profileData.address || "",
            graduation_year: profileData.graduation_year?.toString() || "",
            university: profileData.university || "",
            course: profileData.course || "",
            bio: profileData.bio || "",
            linkedin_url: profileData.linkedin_url || "",
            facebook_url: profileData.facebook_url || "",
            instagram_url: profileData.instagram_url || "",
            twitter_url: profileData.twitter_url || ""
          });

          // Set profile image from profile data
          if (profileData.image_url) {
            setProfileImage(profileData.image_url);
          }
        } else {
          toast.error(response.data.message || 'Failed to fetch profile');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        if (err.response?.status === 401) {
          toast.error('Your session has expired. Please login again.');
        } else {
          toast.error('Failed to load profile data');
        }
      } finally {
        setFetchingProfile(false);
      }
    };

    if (token) {
      fetchProfile();
    } else {
      setFetchingProfile(false);
    }
  }, [token]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle password input changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /*--- Image upload functions ----*/
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

 const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (file && file.type.startsWith("image/")) {
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be less than 2 MB.");
      return;
    }

    setProfileFile(file);
    setProfileImage(URL.createObjectURL(file));
    setImageRemoved(false);  // reset
  } else {
    toast.error("Please upload a valid image file (JPEG or PNG).");
  }
};

  const handleRemoveImage = () => {
  setProfileImage("/images/default_img.png");
  setProfileFile(null);
  setImageRemoved(true);   // important
  fileInputRef.current.value = null;
};

  // Handle profile update submission
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);

      // Create FormData object
      const submitData = new FormData();
      
    // Append all form fields
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key] || "");
      });

     // Case 1: New image uploaded
      if (profileFile) {
        submitData.append("image", profileFile);
      }

      // Case 2: Image removed
      if (imageRemoved) {
        submitData.append("image", "removed");
      }

      // Case 3: Editing other fields → send nothing

      // Make API call with token
      const response = await api.post('/student/update-profile', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success === true) {
        toast.success(response.data.message || 'Profile updated successfully!');
        
        // Refresh profile data
        const profileResponse = await api.get('/get/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (profileResponse.data.status === true) {
          const profileData = profileResponse.data.data.profile;
          setFormData(prev => ({
            ...prev,
            phone: profileData.phone || "",
            date_of_birth: formatDateForInput(profileData.date_of_birth),
            gender: profileData.gender || "",
            address: profileData.address || "",
            graduation_year: profileData.graduation_year?.toString() || "",
            university: profileData.university || "",
            course: profileData.course || "",
            bio: profileData.bio || "",
            linkedin_url: profileData.linkedin_url || "",
            facebook_url: profileData.facebook_url || "",
            instagram_url: profileData.instagram_url || "",
            twitter_url: profileData.twitter_url || ""
          }));
          
          if (profileData.image_url) {
            setProfileImage(profileData.image_url);
          }
        }
        
        // Clear the file input
        setProfileFile(null);
        fileInputRef.current.value = null;
      } else {
        toast.error(response.data.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      
      if (err.response?.status === 401) {
        toast.error('Your session has expired. Please login again.');
      } else if (err.response?.status === 422) {
        // Validation errors
        const errors = err.response.data.errors;
        Object.values(errors).forEach(error => {
          toast.error(error[0]);
        });
      } else {
        toast.error(err.response?.data?.message || 'Failed to update profile. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle password update
  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (passwordData.new_password !== passwordData.new_password_confirmation) {
      toast.error('New password and confirmation do not match');
      return;
    }

    if (passwordData.new_password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      setPasswordLoading(true);

      const response = await api.post('/student/update-password', {
        old_password: passwordData.old_password,
        new_password: passwordData.new_password,
        new_password_confirmation: passwordData.new_password_confirmation
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.status === true) {
        toast.success(response.data.message || 'Password updated successfully!');
        
        // Clear password fields
        setPasswordData({
          old_password: "",
          new_password: "",
          new_password_confirmation: ""
        });
        
        // Hide all password visibility toggles
        setShowOld(false);
        setShowNew(false);
        setShowConfirm(false);
      } else {
        toast.error(response.data.message || 'Failed to update password');
      }
    } catch (err) {
      console.error('Error updating password:', err);
      
      if (err.response?.status === 401) {
        toast.error('Your session has expired. Please login again.');
      } else if (err.response?.status === 422) {
        const data = err.response.data;

        if (data.errors) {
          Object.values(data.errors).forEach(error => {
            toast.error(error[0]);
          });
        } else if (data.message) {
          toast.error(data.message);
        }
      } else {
        toast.error(err.response?.data?.message || 'Failed to update password. Please try again.');
      }
    } finally {
      setPasswordLoading(false);
    }
  };

  // Loading state
  if (fetchingProfile) {
    return (
      <div className="my_account profile_page py-4">
        <div className="container">
          <div className="row">
            <h1 className="mb-3 sec-title text-center">My Profile</h1>
            <div className="col-lg-4 col-xl-3 mb-4 mb-lg-0">
              <DashSidebar />
            </div>
            <div className="col-lg-8 col-xl-9 mb-4 mb-lg-0">
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                <div className="text-center">
                  <i className="fas fa-spinner fa-spin fa-3x text_theme"></i>
                  <p className="mt-3">Loading profile...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my_account profile_page py-4">
      <div className="container">
        <div className="row">
          <h1 className="mb-3 sec-title text-center">My Profile</h1>
          <div className="col-lg-4 col-xl-3 mb-4 mb-lg-0">
            <DashSidebar />
          </div>

          <div className="col-lg-8 col-xl-9 mb-4 mb-lg-0">
            <div className="row ">
              {/* PERSONAL DETAILS */}
              <div className="col-12 mb-4">
                <div className="card border-0 h-100">
                  <h5 className="fw-semibold text_blue">Personal Details</h5>

                  <div className="d-flex align-items-sm-end mt-3 profile_image_wrapper border-bottom pb-3">
                    <div className="profile_image position-relative me-4">
                      <img
                        src={profileImage}
                        className="w-100 h-100"
                        alt="Profile Preview"
                        onError={(e) => {
                          e.target.src = "/images/default_img.png";
                        }}
                      />
                      {profileImage !== "/images/default_img.png" && (
                        <div
                          className="remove_profile"
                          data-bs-toggle="tooltip"
                          data-bs-placement="right"
                          data-bs-title="Delete Image"
                          onClick={handleRemoveImage}
                          style={{ cursor: "pointer" }}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </div>
                      )}
                    </div>

                    <div>
                      <input
                        type="file"
                        id="upload_image"
                        ref={fileInputRef}
                        style={{ display: "none", visibility: "hidden" }}
                        onChange={handleImageChange}
                        accept="image/jpeg,image/png"
                      />
                      <button
                        className="blue_outline_btn mb-2"
                        onClick={handleUploadClick}
                        type="button"
                      >
                        Upload Image <i className="fas fa-upload"></i>
                      </button>
                      <p className="mb-0">
                        Image must be JPEG or PNG format and less than 2 MB.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleUpdateProfile}>
                    <div className="row mt-4">
                      <div className="col-md-6 mb-4">
                        <label className="mb-2">Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={user?.name || response?.data?.data?.name || ''}
                          readOnly
                        />
                      </div>

                      <div className="col-md-6 mb-4">
                        <label className="mb-2">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={user?.email || response?.data?.data?.email || ''}
                          readOnly
                        />
                      </div>

                      <div className="col-md-6 mb-4">
                        <label className="mb-2">Phone Number</label>
                        <PhoneInput
                          country={"us"}
                          value={formData.phone}
                          onChange={(phone) => setFormData(prev => ({ ...prev, phone }))}
                          inputClass="form-control"
                          inputProps={{
                            name: 'phone',
                            required: false
                          }}
                        />
                      </div>

                      <div className="col-md-6 mb-4">
                        <label className="mb-2">Gender</label>
                        <select 
                          name="gender" 
                          className="form-select" 
                          value={formData.gender}
                          onChange={handleInputChange}
                        >
                          <option value="">Select</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="others">Others</option>
                        </select>
                      </div>

                      <div className="col-md-6 mb-4">
                        <label className="mb-2">Date of Birth</label>
                        <input
                          type="date"
                          name="date_of_birth"
                          className="form-control"
                          value={formData.date_of_birth}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="col-md-6 mb-4">
                        <label className="mb-2">University</label>
                        <input
                          type="text"
                          name="university"
                          className="form-control"
                          placeholder="e.g. Harvard University"
                          value={formData.university}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="col-md-6 mb-4">
                        <label className="mb-2">Graduation Year</label>
                        <input
                          type="text"
                          name="graduation_year"
                          className="form-control"
                          placeholder="e.g. 2028"
                          maxLength={4}
                          value={formData.graduation_year}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="col-md-6 mb-4">
                        <label className="mb-2">Course</label>
                        <input
                          type="text"
                          name="course"
                          className="form-control"
                          placeholder="e.g. B.Tech"
                          value={formData.course}
                          onChange={handleInputChange}
                        />
                      </div>

                      

                      <div className="col-12 mb-4">
                        <label className="mb-2">Address</label>
                        <input
                          type="text"
                          name="address"
                          className="form-control"
                          placeholder="e.g. 123, Main Street Road"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="col-12 mb-4">
                        <label className="mb-2">About me</label>
                        <textarea
                          rows={5}
                          name="bio"
                          className="form-control"
                          placeholder="Write about yourself..."
                          value={formData.bio}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>

                      {[
                        { label: "Facebook", name: "facebook_url" },
                        { label: "Instagram", name: "instagram_url" },
                        { label: "LinkedIn", name: "linkedin_url" },
                        { label: "Twitter", name: "twitter_url" }
                      ].map((item) => (
                        <div className="col-lg-6 mb-4" key={item.name}>
                          <label className="mb-2">{item.label} URL</label>
                          <input
                            type="url"
                            name={item.name}
                            className="form-control"
                            placeholder={`https://${item.label.toLowerCase()}.com/username`}
                            value={formData[item.name]}
                            onChange={handleInputChange}
                          />
                        </div>
                      ))}

                      <div className="d-flex justify-content-end">
                        <button 
                          type="submit" 
                          className="theme_btn"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <i className="fas fa-spinner fa-spin me-2"></i>
                              Updating...
                            </>
                          ) : (
                            <>
                              Update Profile{" "}
                              <i className="fas fa-arrow-right-long"></i>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* CHANGE PASSWORD */}
              <div className="col-xl-12 d-flex flex-column mb-4 mb-xl-0">
                <div className="card border-0 card_height password_card">
                  <h5 className="fw-semibold text_blue">Change Password</h5>
                  <form onSubmit={handleUpdatePassword}>
                    <div className="row mt-3">
                      <div className="col-lg-6 mb-4 position-relative">
                        <label className="mb-2">Old Password</label>
                        <input
                          type={showOld ? "text" : "password"}
                          name="old_password"
                          className="form-control"
                          autoComplete="current-password"
                          value={passwordData.old_password}
                          onChange={handlePasswordChange}
                          required
                        />
                        <i
                          className={`fa ${
                            showOld ? "fa-eye" : "fa-eye-slash"
                          } position-absolute`}
                          onClick={() => setShowOld(!showOld)}
                          style={{ cursor: 'pointer', right: '15px', top: '45px' }}
                        ></i>
                      </div>

                      <div className="col-lg-6 mb-4 position-relative">
                        <label className="mb-2">New Password</label>
                        <input
                          type={showNew ? "text" : "password"}
                          name="new_password"
                          className="form-control"
                          autoComplete="new-password"
                          value={passwordData.new_password}
                          onChange={handlePasswordChange}
                          required
                          minLength={6}
                        />
                        <i
                          className={`fa ${
                            showNew ? "fa-eye" : "fa-eye-slash"
                          } position-absolute`}
                          onClick={() => setShowNew(!showNew)}
                          style={{ cursor: 'pointer', right: '15px', top: '45px' }}
                        ></i>
                      </div>

                      <div className="col-12 mb-4 position-relative">
                        <label className="mb-2">Confirm New Password</label>
                        <input
                          type={showConfirm ? "text" : "password"}
                          name="new_password_confirmation"
                          className="form-control"
                          autoComplete="new-password"
                          value={passwordData.new_password_confirmation}
                          onChange={handlePasswordChange}
                          required
                        />
                        <i
                          className={`fa ${
                            showConfirm ? "fa-eye" : "fa-eye-slash"
                          } position-absolute`}
                          onClick={() => setShowConfirm(!showConfirm)}
                          style={{ cursor: 'pointer', right: '15px', top: '45px' }}
                        ></i>
                      </div>

                      <div className="d-flex justify-content-end">
                        <button 
                          type="submit" 
                          className="theme_btn"
                          disabled={passwordLoading}
                        >
                          {passwordLoading ? (
                            <>
                              <i className="fas fa-spinner fa-spin me-2"></i>
                              Updating...
                            </>
                          ) : (
                            <>
                              Update Password{" "}
                              <i className="fas fa-arrow-right-long"></i>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;