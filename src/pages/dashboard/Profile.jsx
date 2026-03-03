import DashSidebar from "./DashSidebar";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useAuth } from "../../context/AuthContext";
import { useRef, useState } from "react";

const Profile = () => {
  const fileInputRef = useRef(null);
  const { user } = useAuth();
  console.log(user)

  const [profileImage, setProfileImage] = useState("/images/default_img.png");
  const [profileFile, setProfileFile] = useState(null);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  /*--- Image upload remove functions ----*/

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

      setProfileFile(file); // store real file
      setProfileImage(URL.createObjectURL(file)); // preview
    } else {
      toast.error("Please upload a valid image file (JPEG or PNG).");
    }
  };

  const handleRemoveImage = () => {
    setProfileImage("/images/default_img.png"); // reset to default or blank
    fileInputRef.current.value = null;
  };

  /*--- Image upload remove functions ----*/

  return (
    <div className="my_account profile_page py-4">
      <div className="container">
        <div className="row">
          <h1 className="mb-2 sec-title text-center">My Profile</h1>
          <div className="col-lg-4 col-xl-3 mb-4 mb-lg-0">
            <DashSidebar />
          </div>

          <div className="col-lg-8 col-xl-9 mb-4 mb-lg-0">
            <div className="row ">
              {/* PERSONAL DETAILS */}
              <div className="col-12 mb-4">
                <div className="card border-0 h-100">
                  <h5 className="fw-semibold text_blue">Personal Details</h5>

                  <div className="d-flex align-items-end mt-3 profile_image_wrapper border-bottom pb-3">
                    <div className="profile_image position-relative me-4">
                      <img
                        src={profileImage}
                        className="w-100 h-100"
                        alt="Profile Preview"
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
                      />
                      <button
                        className="blue_outline_btn mb-2"
                        onClick={handleUploadClick}
                      >
                        Upload Image <i className="fas fa-upload"></i>
                      </button>
                      <p className="mb-0">
                        Image must be JPEG or PNG format and less than 2 MB.
                      </p>
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col-md-6 mb-4">
                      <label className="mb-2">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={user?.name}
                        readOnly
                      />
                    </div>

                    <div className="col-md-6 mb-4">
                      <label className="mb-2">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={user?.email}
                        readOnly
                      />
                    </div>

                    <div className="col-md-6 mb-4">
                      <label className="mb-2">Phone Number</label>
                      {/* <PhoneInput
                          country={"us"}
                          value="+1-1234567890"
                          inputClass="form-control"
                          inputProps={{ readOnly: true }}
                        /> */}
                      <input
                        type="text"
                        className="form-control"
                        placeholder="+1 787 9879798"
                        value={user?.phone || "NA"}
                        readOnly
                      />
                    </div>

                    <div className="col-md-6 mb-4">
                      <label className="mb-2">Gender</label>
                      <select name="" className="form-select" id="">
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
                        className="form-control"
                        placeholder="10-10-2000"
                        
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <label className="mb-2">University</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Harvard University"
                        
                        
                      />
                    </div>

                    <div className="col-md-6 mb-4">
                      <label className="mb-2">Graduation Year</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="i.e 2028"
                        maxLength={4} 
                      />
                    </div>

                    <div className="col-md-6 mb-4">
                      <label className="mb-2">Course</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="B.Tech IT"
                        maxLength={4} 
                      />
                    </div>
                    <div className="col-12 mb-4">
                      <label className="mb-2">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="123, Main Street Road"
                        maxLength={4} 
                      />
                    </div>

                    <div className="col-12 mb-4">
                      <label className="mb-2">About me</label>
                      <textarea
                        rows={5}
                        className="form-control"
                        placeholder="Write about yourself..."
                      ></textarea>
                    </div>

                    <div className="d-flex justify-content-end">
                      <button type="button" className="theme_btn">
                        Update Profile{" "}
                        <i className="fas fa-arrow-right-long"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* SOCIAL MEDIA */}
              <div className="col-xl-6 d-flex flex-column mb-4 mb-xl-0">
                <div className="card border-0 card_height">
                  <h5 className="fw-semibold text_blue">Social Media</h5>

                  <div className="row mt-3">
                    {["Facebook", "Instagram", "LinkedIn", "Twitter"].map(
                      (item, index) => (
                        <div className="col-lg-6 mb-4" key={index}>
                          <label className="mb-2">{item} Url</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={`https://${item.toLowerCase()}.com`}
                          />
                        </div>
                      ),
                    )}

                    <div className="d-flex justify-content-end">
                      <button type="button" className="theme_btn">
                        Update Links <i className="fas fa-arrow-right-long"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* CHANGE PASSWORD */}
              <div className="col-xl-6 d-flex flex-column mb-4 mb-xl-0">
                <div className="card border-0 card_height password_card">
                  <h5 className="fw-semibold text_blue">Change Password</h5>
                    <form action="">
                        <div className="row mt-3">
                          <div className="col-lg-6 mb-4 position-relative">
                            <label className="mb-2">Old Password</label>
                            <input 
                             type={showOld ? "text" : "password"} 
                              className="form-control" autoComplete="current-password" />
                              <i
                                className={`fa ${
                                    showOld ? "fa-eye" : "fa-eye-slash"
                                } position-absolute`}
                                onClick={() => setShowOld(!showOld)}
                                ></i>
                            </div>

                            <div className="col-lg-6 mb-4 position-relative">
                            <label className="mb-2">New Password</label>
                            <input
                              type={showNew ? "text" : "password"}
                              className="form-control" autoComplete="current-password" />
                               <i
                                className={`fa ${
                                    showNew ? "fa-eye" : "fa-eye-slash"
                                } position-absolute`}
                                onClick={() => setShowNew(!showNew)}
                                ></i>
                            </div>

                            <div className="col-12 mb-4 position-relative">
                               <label className="mb-2">Confirm Password</label>
                                <input 
                                type={showConfirm ? "text" : "password"}
                                className="form-control" autoComplete="current-password" />
                                <i className={`fa ${ showConfirm ? "fa-eye" : "fa-eye-slash" } position-absolute`}
                                onClick={() => setShowConfirm(!showConfirm)}
                                ></i>
                            </div>

                            <div className="d-flex justify-content-end">
                            <button type="button" className="theme_btn">
                                Update Password{" "}
                                <i className="fas fa-arrow-right-long"></i>
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
