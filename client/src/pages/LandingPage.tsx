import { motion } from "motion/react";
import { Link } from "react-router";
import FeatureCard from "../ui/FeatureCard";
import { useState } from "react";
import NavLink from "../ui/NavLink";
import { MdAutoMode } from "react-icons/md";
import { IoSpeedometerOutline } from "react-icons/io5";
import { BsGlobe } from "react-icons/bs";
import { CiHeadphones } from "react-icons/ci";
import { BsDatabaseLock } from "react-icons/bs";
import { TfiLayoutTabWindow } from "react-icons/tfi";
import PriceCard from "../ui/PriceCard";

const pricePlans = {
    free: [
        "Collaborate with up to 3 teammates",
        "Core task management features",
        "Unlimited projects and tasks",
        "Board and list views"
    ],
    pro: [
        "Collaborate with up to 10 teammates",
        "Custom workflows and templates",
        "Advanced tracking and reports",
        "Role based access control",
        "Automated task reminders",
        "Priority integrations",
        "Email support"
    ],
    team: [
        "Dedicated success manager included",
        "Custom roles and permissions",
        "Unlimited workflows and automations",
        "Up to 25 teammates",
        "Real-time analytics",
        "Premium integration",
        "Priority support"
    ]
}

function LandingPage() {
  const [plan, setPlan] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="bg-neutral-950 p-8 align-middle text-white">
      <div className="m-auto max-w-[1200px]">
        <nav className="flex items-center justify-center md:justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="logo hidden text-sm font-semibold md:block md:text-lg"
          >
            Taskley 
          </motion.h2>

          <ul className="flex items-center gap-3 text-xs md:text-sm">
            <NavLink delay={0.1}>
                <span>About</span>
            </NavLink>

            <NavLink delay={0.2}>
                <span>Features</span>
            </NavLink>

            <NavLink delay={0.3}>
                <span>Benefits</span>
            </NavLink>

            <NavLink delay={0.4}>
                <span>Customers</span>
            </NavLink>

            <NavLink delay={0.5}>
                <span>Pricing</span>
            </NavLink>

            <NavLink delay={0.6}>
                <span>Contact</span>
            </NavLink>
          </ul>

          {/* <Link to={"/app"} className="rounded-full bg-stone-500 px-6 py-3">
            <button className="text-white">
              {!isLoaded ? (
                <div className="flex items-center gap-3">
                  <Spinner size={4} />{" "}
                  <SignInButton>
                    <span className="hover:cursor-pointer">Get Started</span>
                  </SignInButton>
                </div>
              ) : isSignedIn ? (
                <span className="hover:cursor-pointer">Dashboard</span>
              ) : (
                <SignInButton>
                  <span className="hover:cursor-pointer">Get Started</span>
                </SignInButton>
              )}
            </button>
          </Link> */}
        </nav>

        <main className="">
          <section className="flex flex-col gap-8">
            <motion.h1
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-xl font-bold md:text-3xl lg:text-5xl mt-40"
            >
                <p>
                    Organize your work,
                </p>
                <p>
                    simplify your life
                </p>
            </motion.h1>

            <span className="block text-neutral-400 lg:w-[500px]">
                Manage projects effortlessly with smart tools, stay on track, meed deadlines, and keep your team productive.
            </span>

            <div className="flex items-center gap-3">
            <Link
              to={"/app"}
              className="rounded-lg bg-brand-500 px-6 py-3 text-sm md:text-md lg:text-lg font-semibold hover:cursor-pointer"
            >
              <span>Get Started</span>
            </Link>

            <Link
              to={"/app"}
              className="rounded-lg bg-neutral-900 border border-neutral-700 px-6 py-3 text-sm md:text-md lg:text-lg font-semibold hover:cursor-pointer"
            >
              <span>How it works</span>
            </Link>

            </div>
          </section>

          <section className="mt-14">
            <div className="w-full max-w-[1200px] rounded-2xl border bg-linear-to-br from-white/10 to-white/50 p-14 backdrop-blur-3xl">
              <img src="/sample_lp.png" alt="" className="rounded-lg" />
            </div>
          </section>

          {/* FEATURES SECTION */}
          {/*
          <section className="mt-20">
            <h3 className="lg:text-4xl font-semibold">Focus on what matters</h3>
            <p className="w-[400px] mt-4 text-sm">Explore powerful features designed to help teams plan, track and deliver tasks with ease.</p>

            <div>
                <div>
                    <h4>Stay organized and manage tasks effortlessly</h4> 
                    <p>Prioritize, track progress, and manage everything in one place for a smooter workflow</p>
                </div>
            </div>
          </section>
          */}

          <section className="mt-40">
            <h3 className="lg:text-4xl font-semibold">Why people choose Taskley</h3>
            <p className="mt-6 text-sm">Unlock the full potential of your business with unparalleled efficiency and productivity.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10">
                <FeatureCard icon={<MdAutoMode />} title="Automated reports" description="Generate reports effortlessly and stay informed with ease."/>
                <FeatureCard icon={<BsGlobe />} title="Seamless integration" description="Effortlessly connect Aurix with your existing tools for a unified workflow."/>
                <FeatureCard icon={<IoSpeedometerOutline />} title="Boost productivity" description="Automate routine tasks to save time and enhance your team's efficiency."/>
                <FeatureCard icon={<CiHeadphones />} title="24/7 Support" description="Get round-the-clock assistance with our support team."/>
                <FeatureCard icon={<BsDatabaseLock />} title="Data Security & compliance" description="Protect your business with advanced encryption and compliance standards."/>
                <FeatureCard icon={<TfiLayoutTabWindow />} title="Intuitive user experience" description="User friendly, straightforward interface"/>
            </div>
          </section>

          <section className="mt-40">
            <h3 className="lg:text-4xl font-semibold">Pick the perfect plan</h3>
            <div className="flex items-center justify-between">
                <p className="mt-6 text-sm">Stay organized, hit your goals, and scale your productivity on your terms.</p>
                <div className="flex items-center bg-neutral-900 border border-neutral-700 rounded-lg p-1 transition-all">
                    <button onClick={() => setPlan("monthly")} className={`px-3 py-2 rounded-md ${plan === "monthly" ? "bg-neutral-950" : ""}`}>Monthly</button>
                    <button onClick={() => setPlan("yearly")} className={`px-3 py-2 rounded-md ${plan === "yearly" ? "bg-neutral-950" : ""}`}>Yearly</button>
                </div>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                <PriceCard color="orange" planName="Free" desc="Ideal solution for small teams and fast moving startups" price={0} planLen="Forever" features={pricePlans.free}/>
                <PriceCard color="violet" planName="Pro" desc="Ideal solution for small teams and fast moving startups" price={16} planLen="month" features={pricePlans.pro}/>
                <PriceCard color="green" planName="Team" desc="Ideal solution for small teams and fast moving startups" price={42} planLen="month" features={pricePlans.team}/>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}

export default LandingPage;
