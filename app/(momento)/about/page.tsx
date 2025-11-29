"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, Users, User, Shield, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

const AboutPage = () => {
  const router = useRouter();

  const teamMembers = [
    {
      name: "Mayur Mahavir Bijarniya",
      section: "Section 05",
    },
    {
      name: "Niraj Mehta",
      section: "Section 05",
    },
  ];

  const repositories = {
    frontend: "https://github.com/mayurbijarniya/momento-frontend",
    backend: "https://github.com/mayurbijarniya/momento-backend",
  };

  return (
    <div className="common-container">
      <div className="max-w-4xl w-full mx-auto py-6">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="mb-6 flex items-center gap-2 text-light-1 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Button>

        <div className="bg-dark-2 rounded-lg p-6 md:p-8 border border-dark-4">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <Users className="w-8 h-8 text-light-1" />
            <h1 className="h1-bold text-light-1">About Momento</h1>
          </div>

          <div className="space-y-6 md:space-y-8">
            <section>
              <h2 className="h2-bold text-light-1 mb-4">Team Members</h2>
              <div className="space-y-3">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="bg-dark-3 rounded-lg p-4 border border-dark-4"
                  >
                    <p className="base-semibold text-light-1">{member.name}</p>
                    <p className="small-regular text-light-3">
                      Section: {member.section}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="h2-bold text-light-1 mb-4">User Types</h2>
              <div className="space-y-4">
                <div className="bg-dark-3 rounded-lg p-4 md:p-5 border border-dark-4">
                  <div className="flex items-center gap-3 mb-3">
                    <User className="w-5 h-5 text-light-1 flex-shrink-0" />
                    <p className="base-semibold text-light-1">Regular Users</p>
                  </div>
                  <div className="space-y-2 text-light-3 small-regular">
                    <p className="text-light-1 base-medium mb-2">Content Management:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Create, edit, and delete own posts</li>
                      <li>Upload images with captions, tags, and location</li>
                      <li>Like and unlike posts</li>
                      <li>Save and unsave posts</li>
                    </ul>
                    <p className="text-light-1 base-medium mt-3 mb-2">Social Features:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Follow and unfollow other users</li>
                      <li>View followers and following lists</li>
                      <li>Send messages (AI chat and user-to-user messaging)</li>
                      <li>View and manage notifications</li>
                    </ul>
                    <p className="text-light-1 base-medium mt-3 mb-2">Reviews & Engagement:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Create reviews for posts and external content</li>
                      <li>Edit and delete own reviews</li>
                      <li>Rate content with star ratings (1-5 stars)</li>
                    </ul>
                    <p className="text-light-1 base-medium mt-3 mb-2">Profile & Account:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Update profile information (name, username, bio, image)</li>
                      <li>View own saved posts collection</li>
                      <li>View own liked posts collection</li>
                      <li>Delete own account</li>
                    </ul>
                    <p className="text-light-1 base-medium mt-3 mb-2">Content Access:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Full home feed with all posts</li>
                      <li>View all posts on any profile</li>
                      <li>Search local posts and external content (Unsplash)</li>
                      <li>View external content details</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-dark-3 rounded-lg p-4 md:p-5 border border-dark-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-5 h-5 text-light-1 flex-shrink-0" />
                    <p className="base-semibold text-light-1">Admin Users</p>
                  </div>
                  <div className="space-y-2 text-light-3 small-regular">
                    <p className="text-light-1 base-medium mb-2">All Regular User Capabilities PLUS:</p>
                    <p className="text-light-1 base-medium mt-3 mb-2">Admin Dashboard Access:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>View all registered users in the system</li>
                      <li>View all posts created by any user</li>
                      <li>Delete any user account (except own account)</li>
                      <li>Delete any post for content moderation</li>
                      <li>See user roles (USER/ADMIN) in dashboard</li>
                      <li>Access admin-only navigation and features</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-dark-3 rounded-lg p-4 md:p-5 border border-dark-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Eye className="w-5 h-5 text-light-1 flex-shrink-0" />
                    <p className="base-semibold text-light-1">Anonymous Users</p>
                  </div>
                  <div className="space-y-2 text-light-3 small-regular">
                    <p className="text-light-1 base-medium mb-2">Limited Content Access:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>View home feed (limited to 3 posts with sign-in prompt)</li>
                      <li>View public profiles (limited to 2 posts per profile)</li>
                      <li>Browse all users page to see community members</li>
                      <li>Explore page with limited "Popular today" posts (3 posts)</li>
                      <li>Search local posts (only within visible 3 posts)</li>
                      <li>Search external content (Unsplash photos)</li>
                      <li>View external content details</li>
                      <li>View reviews on external content</li>
                    </ul>
                    <p className="text-light-1 base-medium mt-3 mb-2">Restricted Actions:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Cannot create, edit, or delete posts</li>
                      <li>Cannot like or save posts</li>
                      <li>Cannot follow or unfollow users</li>
                      <li>Cannot view followers/following lists (redirects to sign-in)</li>
                      <li>Cannot send messages</li>
                      <li>Cannot view notifications</li>
                      <li>Cannot update profile</li>
                      <li>Cannot create reviews</li>
                    </ul>
                    <p className="text-light-1 base-medium mt-3 mb-2">Account Access:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Can sign up to create a new account</li>
                      <li>Can sign in to existing account</li>
                      <li>Can view About page and Privacy Policy</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="h2-bold text-light-1 mb-4">GitHub Repositories</h2>
              <div className="space-y-3">
                <Link
                  href={repositories.frontend}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-dark-3 rounded-lg p-4 border border-dark-4 hover:bg-dark-4 transition-colors group"
                >
                  <Github className="w-6 h-6 text-light-1 group-hover:text-white transition-colors" />
                  <div>
                    <p className="base-semibold text-light-1">Frontend Repository</p>
                    <p className="small-regular text-light-3 break-all">
                      {repositories.frontend}
                    </p>
                  </div>
                </Link>

                <Link
                  href={repositories.backend}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-dark-3 rounded-lg p-4 border border-dark-4 hover:bg-dark-4 transition-colors group"
                >
                  <Github className="w-6 h-6 text-light-1 group-hover:text-white transition-colors" />
                  <div>
                    <p className="base-semibold text-light-1">Backend Repository</p>
                    <p className="small-regular text-light-3 break-all">
                      {repositories.backend}
                    </p>
                  </div>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

