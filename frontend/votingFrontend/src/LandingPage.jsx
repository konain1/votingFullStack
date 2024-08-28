import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function LandingPage() {
  const navigate = useNavigate();

  const logoRef = useRef();
  const buttonRef = useRef();
  const leftRef = useRef();
  const rightRef = useRef();

  useGSAP(() => {
    let tl = gsap.timeline({
      duration: 0.4,
      opacity: 1,
      delay: 0.2
    });

    tl.from(buttonRef.current, {
      x: 300,
    })
      .from(logoRef.current, {
        x: -300,
      }, "-=0.4")
      .from(leftRef.current.children, {
        y: 50,
        opacity: 0,
        stagger: 0.2,
      }, "leftright")
      .from(rightRef.current, {
        x: '100%',
        opacity: 0,
      }, "leftright");
   
  });

  return (
    <div className="bg-[#0f172a] min-h-screen text-white">
      {/* Navbar */}
      <div className="flex justify-between items-center p-6 bg-[#1e293b] shadow-lg">
        <div ref={logoRef} className="text-xl font-bold">
          VoterSocialMedia
        </div>

        <div className='flex gap-2'>

        <div ref={buttonRef} className="flex">
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </div>

        <div ref={buttonRef} className="flex space-x-4">
          <button
            onClick={() => navigate('/signup')}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            SignUp
          </button>
        </div>

        </div>
       
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Left Side Content */}
        <div ref={leftRef} className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-extrabold mb-4">Welcome to VoterSocialMedia</h2>
          <h3 className="text-xl font-semibold mb-4">About the App</h3>
          <p className="text-base mb-6">
            Welcome to our app, a dynamic platform designed to manage and
            interact with candidates in a streamlined way. This app is perfect
            for users who want to engage in voting processes, manage their
            profiles, and ensure up-to-date candidate information.
          </p>
          <h3 className="text-xl font-semibold mb-4">What Does the App Do?</h3>
          <ul className="list-disc list-inside text-base space-y-4">
            <li>
              <strong>Candidate Management:</strong>
              <ul className="list-decimal list-inside ml-4 space-y-2">
                <li>The app allows for the creation and management of candidates who can participate in voting.</li>
                <li>Every 6 hours, the system automatically deletes candidates who have been in the system for too long, ensuring that only the most current candidates are available for interaction.</li>
              </ul>
            </li>
            <li>
              <strong>Voting:</strong>
              <ul className="list-decimal list-inside ml-4 space-y-2">
                <li>Users can easily cast their votes for their preferred candidates.</li>
                <li>The app keeps track of votes, showing the popularity of each candidate.</li>
              </ul>
            </li>
            <li>
              <strong>User Profiles:</strong>
              <ul className="list-decimal list-inside ml-4 space-y-2">
                <li>Each user has a personalized profile where they can manage their information.</li>
                <li>Users can upload a profile picture to personalize their account.</li>
              </ul>
            </li>
            <li>
              <strong>Admin Control:</strong>
              <ul className="list-decimal list-inside ml-4 space-y-2">
                <li>If you’re an admin, you can manage candidates and ensure the smooth operation of the platform. Admins have the exclusive right to delete candidates and handle higher-level tasks.</li>
              </ul>
            </li>
            <li>
              <strong>Secure and User-Friendly:</strong>
              <ul className="list-decimal list-inside ml-4 space-y-2">
                <li>The app is designed with security in mind, ensuring that your data is protected.</li>
                <li>The interface is simple and intuitive, making it easy for users of all levels to navigate and use the app effectively.</li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Right Side Content */}
        <div ref={rightRef} className="w-full md:w-1/2 p-8">
          <div className="bg-[green] p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">How to Use VoterSocialMedia</h2>
            <ul className="list-disc list-inside text-base space-y-4">
              <li>
                <strong>Sign Up:</strong> Create your account by signing up with your email, phone number, and other required details.
              </li>
              <li>
                <strong>Create or Manage Candidates:</strong> If you're an admin, you can add, edit, or delete candidates from the system.
              </li>
              <li>
                <strong>Vote for Candidates:</strong> Browse the list of candidates and cast your vote for the one you support.
              </li>
              <li>
                <strong>View Results:</strong> See how many votes each candidate has received and view overall election results.
              </li>
              <li>
                <strong>Manage Your Profile:</strong> Update your profile information and upload a profile picture to personalize your account.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
