"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, Shield, Lock, Eye, Database, Mail } from "lucide-react";

const PrivacyPolicy = () => {
  const router = useRouter();

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
            <Shield className="w-8 h-8 text-light-1" />
            <h1 className="h1-bold text-light-1">Privacy Policy</h1>
          </div>

          <p className="text-light-3 mb-6 md:mb-8 small-regular">
            Last updated: December 06, 2025
          </p>

          <div className="space-y-6 md:space-y-8">
          {/* Introduction */}
          <section className="bg-dark-3 rounded-lg p-4 md:p-5 border border-dark-4">
            <h2 className="h2-bold text-light-1 mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-light-1 flex-shrink-0" />
              Introduction
            </h2>
            <p className="text-light-3 small-regular leading-relaxed">
              Welcome to Momento. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy explains how we collect, use, and safeguard your information when you use our 
              social media platform.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="bg-dark-3 rounded-lg p-4 md:p-5 border border-dark-4">
            <h2 className="h2-bold text-light-1 mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-light-1 flex-shrink-0" />
              Information We Collect
            </h2>
            <div className="space-y-4 text-light-3 small-regular">
              <div>
                <h3 className="base-medium text-light-1 mb-2">Account Information</h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Name and username</li>
                  <li>Email address</li>
                  <li>Profile picture</li>
                  <li>Bio/description</li>
                </ul>
              </div>
              <div>
                <h3 className="base-medium text-light-1 mb-2">Content You Create</h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Posts and images you upload</li>
                  <li>Reviews and comments</li>
                  <li>Likes and saved posts</li>
                </ul>
              </div>
              <div>
                <h3 className="base-medium text-light-1 mb-2">Social Connections</h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Users you follow</li>
                  <li>Users who follow you</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Protect Your Data */}
          <section className="bg-dark-3 rounded-lg p-4 md:p-5 border border-dark-4">
            <h2 className="h2-bold text-light-1 mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-light-1 flex-shrink-0" />
              How We Protect Your Data
            </h2>
            <div className="space-y-3 text-light-3 small-regular">
              <p>We implement security measures to protect your personal information:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Passwords are encrypted using industry-standard hashing (bcrypt)</li>
                <li>Private information (like email) is hidden from other users viewing your profile</li>
                <li>Secure session management for authenticated users</li>
                <li>Only you can edit or delete your own content</li>
              </ul>
            </div>
          </section>

          {/* Your Rights */}
          <section className="bg-dark-3 rounded-lg p-4 md:p-5 border border-dark-4">
            <h2 className="h2-bold text-light-1 mb-4">Your Rights</h2>
            <div className="space-y-3 text-light-3 small-regular">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Access your personal data through your profile</li>
                <li>Update your profile information at any time</li>
                <li>Delete your account and all associated data</li>
                <li>Control who sees your content through privacy settings</li>
              </ul>
            </div>
          </section>

          {/* Third-Party Services */}
          <section className="bg-dark-3 rounded-lg p-4 md:p-5 border border-dark-4">
            <h2 className="h2-bold text-light-1 mb-4">Third-Party Services</h2>
            <p className="text-light-3 small-regular leading-relaxed">
              Momento integrates with Unsplash API to provide external photo search functionality. 
              When you search for external photos, your search queries are sent to Unsplash. 
              Please review Unsplash&apos;s privacy policy for information about how they handle data.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-dark-3 rounded-lg p-4 md:p-5 border border-dark-4">
            <h2 className="h2-bold text-light-1 mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-light-1 flex-shrink-0" />
              Contact Us
            </h2>
            <p className="text-light-3 small-regular">
              If you have any questions about this Privacy Policy, please contact us through the platform.
            </p>
          </section>
          </div>
        </div>

        <div className="mt-6 md:mt-8 text-center">
          <Button
            onClick={() => router.push("/")}
            className="bg-white text-black hover:bg-gray-300"
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
