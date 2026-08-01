"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import BannerAd from "@/components/ads/BannerAd";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({
  open,
  onClose,
}: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function handleSubmit() {
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      // ================= LOGIN =================
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          if (profileError) {
            console.error(profileError);
          } else {
            console.log("Profile:", profile);
          }
        }

        toast.success("Login Successful");
        onClose();
      }

      // ================= SIGNUP =================
      else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        console.log("Signup Result:", data);
        console.log("Signup Error:", error);

        if (error) throw error;

        if (data.user) {
          const { error: updateError } = await supabase
            .from("profiles")
            .update({
              name: name.trim() || email.split("@")[0],
            })
            .eq("id", data.user.id);

          if (updateError) {
            console.error(updateError);
          }
        }

        toast.success(
          "Account created successfully! Please verify your email."
        );

        onClose();

        setIsLogin(true);
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (err: unknown) {
      console.error(err);

      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 overflow-y-auto">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-6">

        {/* Top Banner */}
       

        <h2 className="mb-6 mt-6 text-center text-3xl font-bold text-white">
          {isLogin ? "Login" : "Create Account"}
        </h2>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white outline-none"
        />

        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4 w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white outline-none"
          />
        )}

        

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 mt-6 w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white outline-none"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {loading
            ? "Please Wait..."
            : isLogin
            ? "Login"
            : "Create Account"}
        </button>

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 w-full text-blue-400"
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </button>

        <button
          onClick={onClose}
          className="mt-3 w-full rounded-lg border border-zinc-700 py-3 text-white"
        >
          Close
        </button>

        {/* Bottom Banner */}
        <div className="mt-6">
          <BannerAd position="bottom" />
        </div>

      </div>
    </div>
  );
}