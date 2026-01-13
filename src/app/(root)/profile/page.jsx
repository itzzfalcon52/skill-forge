import { getCurrentUserData } from "@/modules/profile/actions";
import PlaylistsSection from "@/modules/profile/components/PlaylistsSection";
import ProfileStats from "@/modules/profile/components/ProfileStats";
import SolvedProblems from "@/modules/profile/components/SolvedProblems";
import SubmissionsHistory from "@/modules/profile/components/SubmissionHistoryProfile";
import UserInfoCard from "@/modules/profile/components/UserInfoCard";
import React from "react";

const ProfilePage = async () => {
  const profileData = await getCurrentUserData();

  console.log(profileData);
  return (
    <div className="min-h-screen  py-32">
      <div className="container mx-auto px-4 max-w-7xl">
        <UserInfoCard userData={profileData} />

        <ProfileStats
          submissions={profileData.submissions}
          solvedCount={profileData.solvedProblems.length}
          playlistCount={profileData.playlists.length}
        />

        <SubmissionsHistory submissions={profileData.submissions} />

        <div className="grid  gap-8">
          <SolvedProblems solvedProblems={profileData.solvedProblems} />
          <PlaylistsSection playlists={profileData.playlists} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
