"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Github, 
  Users, 
  User, 
  Shield, 
  Eye,
  FileText,
  Star,
  UserCircle,
  Search,
  Settings,
  Lock,
  LogIn
} from "lucide-react";
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
                  <div className="flex items-center gap-3 mb-4">
                    <User className="w-5 h-5 text-light-1 flex-shrink-0" />
                    <p className="base-semibold text-light-1">Regular Users</p>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-dark-4 rounded-md p-3 border-l-4 border-primary-500">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-primary-500 flex-shrink-0" />
                        <p className="text-light-1 base-medium">Content Management:</p>
                      </div>
                      <ul className="space-y-1.5 ml-6">
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>Create, edit, and delete own posts</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>Upload images with captions, tags, and location</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>Like and unlike posts</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>Save and unsave posts</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-dark-4 rounded-md p-3 border-l-4 border-primary-500">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-primary-500 flex-shrink-0" />
                        <p className="text-light-1 base-medium">Social Features:</p>
                      </div>
                      <ul className="space-y-1.5 ml-6">
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>Follow and unfollow other users</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>View followers and following lists</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>Send messages (AI chat and user-to-user messaging)</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>View and manage notifications</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-dark-4 rounded-md p-3 border-l-4 border-primary-500">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-4 h-4 text-primary-500 flex-shrink-0" />
                        <p className="text-light-1 base-medium">Reviews & Engagement:</p>
                      </div>
                      <ul className="space-y-1.5 ml-6">
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>Create reviews for posts and external content</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>Edit and delete own reviews</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>Rate content with star ratings (1-5 stars)</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-dark-4 rounded-md p-3 border-l-4 border-primary-500">
                      <div className="flex items-center gap-2 mb-2">
                        <UserCircle className="w-4 h-4 text-primary-500 flex-shrink-0" />
                        <p className="text-light-1 base-medium">Profile & Account:</p>
                      </div>
                      <ul className="space-y-1.5 ml-6">
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>Update profile information (name, username, bio, image)</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>View own saved posts collection</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>View own liked posts collection</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>Delete own account</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-dark-4 rounded-md p-3 border-l-4 border-primary-500">
                      <div className="flex items-center gap-2 mb-2">
                        <Search className="w-4 h-4 text-primary-500 flex-shrink-0" />
                        <p className="text-light-1 base-medium">Content Access:</p>
                      </div>
                      <ul className="space-y-1.5 ml-6">
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>Full home feed with all posts</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>View all posts on any profile</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>Search local posts and external content (Unsplash)</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>View external content details</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-dark-3 rounded-lg p-4 md:p-5 border border-dark-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-5 h-5 text-light-1 flex-shrink-0" />
                    <p className="base-semibold text-light-1">Admin Users</p>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-primary-500/10 rounded-md p-3 border-l-4 border-primary-500">
                      <p className="text-light-1 base-medium mb-3 flex items-center gap-2">
                        <span className="text-primary-500">✓</span>
                        <span>All Regular User Capabilities PLUS:</span>
                      </p>
                    </div>

                    <div className="bg-dark-4 rounded-md p-3 border-l-4 border-primary-500">
                      <div className="flex items-center gap-2 mb-2">
                        <Settings className="w-4 h-4 text-primary-500 flex-shrink-0" />
                        <p className="text-light-1 base-medium">Admin Dashboard Access:</p>
                      </div>
                      <ul className="space-y-1.5 ml-6">
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>View all registered users in the system</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>View all posts created by any user</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>Delete any user account (except own account)</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>Delete any post for content moderation</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>See user roles (USER/ADMIN) in dashboard</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>Access admin-only navigation and features</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-dark-3 rounded-lg p-4 md:p-5 border border-dark-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Eye className="w-5 h-5 text-light-1 flex-shrink-0" />
                    <p className="base-semibold text-light-1">Anonymous Users</p>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-dark-4 rounded-md p-3 border-l-4 border-primary-500">
                      <div className="flex items-center gap-2 mb-2">
                        <Eye className="w-4 h-4 text-primary-500 flex-shrink-0" />
                        <p className="text-light-1 base-medium">Limited Content Access:</p>
                      </div>
                      <ul className="space-y-1.5 ml-6">
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>View home feed (limited to 3 posts with sign-in prompt)</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>View public profiles (limited to 2 posts per profile)</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>Browse all users page to see community members</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>Explore page with limited "Popular today" posts (3 posts)</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>Search local posts (only within visible 3 posts)</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>Search external content (Unsplash photos)</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>View external content details</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>View reviews on external content</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-dark-4 rounded-md p-3 border-l-4 border-red-500">
                      <div className="flex items-center gap-2 mb-2">
                        <Lock className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <p className="text-light-1 base-medium">Restricted Actions:</p>
                      </div>
                      <ul className="space-y-1.5 ml-6">
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-red-500">•</span>
                          <span>Cannot create, edit, or delete posts</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-red-500">•</span>
                          <span>Cannot like or save posts</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-red-500">•</span>
                          <span>Cannot follow or unfollow users</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-red-500">•</span>
                          <span>Cannot view followers/following lists (redirects to sign-in)</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-red-500">•</span>
                          <span>Cannot send messages</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-red-500">•</span>
                          <span>Cannot view notifications</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-red-500">•</span>
                          <span>Cannot update profile</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-red-500">•</span>
                          <span>Cannot create reviews</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-dark-4 rounded-md p-3 border-l-4 border-primary-500">
                      <div className="flex items-center gap-2 mb-2">
                        <LogIn className="w-4 h-4 text-primary-500 flex-shrink-0" />
                        <p className="text-light-1 base-medium">Account Access:</p>
                      </div>
                      <ul className="space-y-1.5 ml-6">
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>Can sign up to create a new account</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>Can sign in to existing account</span>
                        </li>
                        <li className="text-light-3 small-regular flex items-center gap-2">
                          <span className="text-primary-500">•</span>
                          <span>Can view About page and Privacy Policy</span>
                        </li>
                      </ul>
                    </div>
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

