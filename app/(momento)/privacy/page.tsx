"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, Shield, Lock, Eye, Database, Mail } from "lucide-react";

const PrivacyPolicy = () => {
  const router = useRouter();

  return (
    <div className="common-container">
      <div className="max-w-4xl mx-auto">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="mb-6 flex items-center gap-2 text-light-1 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Button>

        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-10 h-10 text-white" />
          <h1 className="h2-bold">Privacy Policy</h1>
        </div>

        <p className="text-light-3 mb-8">
          Last updated: November 28, 2025
        </p>

        <div className="space-y-8">
          {/* Introduction */}
          <section className="bg-dark-2 p-6 rounded-xl border border-dark-4">
            <h2 className="h3-bold mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Introduction
            </h2>
            <p className="text-light-2 leading-relaxed">
              Welcome to Momento. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy explains how we collect, use, and safeguard your information when you use our 
              social media platform.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="bg-dark-2 p-6 rounded-xl border border-dark-4">
            <h2 className="h3-bold mb-4 flex items-center gap-2">
              <Database className="w-5 h-5" />
              Information We Collect
            </h2>
            <div className="space-y-4 text-light-2">
              <div>
                <h3 className="font-semibold text-white mb-2">Account Information</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Name and username</li>
                  <li>Email address</li>
                  <li>Profile picture</li>
                  <li>Bio/description</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Content You Create</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Posts and images you upload</li>
                  <li>Reviews and comments</li>
                  <li>Likes and saved posts</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Social Connections</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Users you follow</li>
                  <li>Users who follow you</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Protect Your Data */}
          <section className="bg-dark-2 p-6 rounded-xl border border-dark-4">
            <h2 className="h3-bold mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              How We Protect Your Data
            </h2>
            <div className="space-y-3 text-light-2">
              <p>We implement security measures to protect your personal information:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Passwords are encrypted using industry-standard hashing (bcrypt)</li>
                <li>Private information (like email) is hidden from other users viewing your profile</li>
                <li>Secure session management for authenticated users</li>
                <li>Only you can edit or delete your own content</li>
              </ul>
            </div>
          </section>

          {/* Your Rights */}
          <section className="bg-dark-2 p-6 rounded-xl border border-dark-4">
            <h2 className="h3-bold mb-4">Your Rights</h2>
            <div className="space-y-3 text-light-2">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Access your personal data through your profile</li>
                <li>Update your profile information at any time</li>
                <li>Delete your account and all associated data</li>
                <li>Control who sees your content through privacy settings</li>
              </ul>
            </div>
          </section>

          {/* Third-Party Services */}
          <section className="bg-dark-2 p-6 rounded-xl border border-dark-4">
            <h2 className="h3-bold mb-4">Third-Party Services</h2>
            <p className="text-light-2 leading-relaxed">
              Momento integrates with Unsplash API to provide external photo search functionality. 
              When you search for external photos, your search queries are sent to Unsplash. 
              Please review Unsplash&apos;s privacy policy for information about how they handle data.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-dark-2 p-6 rounded-xl border border-dark-4">
            <h2 className="h3-bold mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Contact Us
            </h2>
            <p className="text-light-2">
              If you have any questions about this Privacy Policy, please contact us through the platform.
            </p>
          </section>
        </div>

        <div className="mt-8 text-center">
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
