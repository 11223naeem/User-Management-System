import { useEffect, useState } from "react";

function MyProfile() {

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const token = localStorage.getItem("token");

  const [profile, setProfile] = useState(null);

  useEffect(() => {

    if (!user?.id) {
      return;
    }

    fetch(
      `http://localhost:8080/api/user/profile/${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then(response => {

        if (!response.ok) {
          throw new Error("Unable to load profile");
        }

        return response.json();

      })
      .then(data => {

        setProfile(data);

      })
      .catch(error => {

        console.error(error);

      });

  }, [user?.id, token]);

  if (!profile) {

    return (
      <div className="page">
        <h1>My Profile</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="page">

      <h1>My Profile</h1>

      <div className="profile-card">

        <h2>
          {profile.name}
        </h2>

        <p>
          <strong>ID:</strong>{" "}
          {profile.id}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {profile.email}
        </p>

        <p>
          <strong>Roles:</strong>{" "}
          {profile.roles?.map(
            role => role.name
          ).join(", ") || "No Role"}
        </p>

      </div>

    </div>
  );
}

export default MyProfile;