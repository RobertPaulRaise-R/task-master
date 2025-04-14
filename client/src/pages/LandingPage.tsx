import { Link } from "react-router";
import FeatureCard from "../ui/FeatureCard";
import { useState } from "react";

function LandingPage() {
  const [active, setActive] = useState("kanban");

  return (
    <div className="bg-[#333] p-8 align-middle text-white">
      <div className="m-auto max-w-[1200px]">
        <nav className="flex items-center justify-between">
          <h2 className="font-semibold">Task Master</h2>

          <ul className="flex items-center gap-3">
            <li className="hover:underline">Solutions</li>
            <li className="hover:underline">Pricing</li>
            <li className="hover:underline">Resources</li>
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

        <main className="mt-20">
          <section className="flex flex-col gap-8">
            <h1 className="text-center text-8xl font-bold">
              The Go-To Hub for All Your To-Dos
            </h1>

            <span className="mx-auto block text-center lg:w-[500px]">
              Your essential tool for streamlining task management and achieving
              greater efficiency in your daily routine.
            </span>

            <Link
              to={"/app"}
              className="mx-auto inline-block rounded-full bg-linear-to-r/longer from-blue-400 to-pink-500 px-6 py-3 text-xl font-semibold"
            >
              <span className="hover:cursor-pointer">Start now it's free!</span>
            </Link>
          </section>

          <section className="mt-14">
            <div className="w-full max-w-[1200px] rounded-2xl border bg-linear-to-br from-white/10 to-white/50 p-14 backdrop-blur-3xl">
              <img src="/sample_lp.png" alt="" className="rounded-lg" />
            </div>
          </section>

          <section className="mt-20 flex flex-col items-center p-8">
            <div className="flex items-center gap-3 rounded-full bg-white/10 px-6 py-2">
              <span className="size-1.5 rounded-full bg-purple-400"></span>
              <span>METRIX</span>
              <span className="size-1.5 rounded-full bg-purple-400"></span>
            </div>

            <h1 className="mt-10 text-center text-7xl font-bold text-stone-300 lg:w-[900px]">
              Performance Insights for your productivity
            </h1>

            <div className="mt-14 grid gap-8 md:grid-cols-3 lg:grid-cols-3">
              <FeatureCard
                title="Get More Done, Faster!"
                label="of users complete their tasks on time."
                percentage="98"
                description="Our app helps users stay productive by efficiently managing tasks and meeting deadlines."
              />
              <FeatureCard
                title="Same Time, Work Smarter!"
                label="faster than with traditional methods."
                percentage="25"
                description="Our smart design and remaidners help users finish tasks faster, freeing up time for what matters most."
              />
              <FeatureCard
                title="Boost Your Teams's Efficiency!"
                label="increase in productivity."
                percentage="30"
                description="Our app improves collaboration and task tracking, boosting communication and meeting deadlines faster."
              />
            </div>
          </section>

          <section className="mt-20 flex flex-col items-center p-8">
            <div className="flex items-center gap-3 rounded-full bg-white/10 px-6 py-2">
              <span className="size-1.5 rounded-full bg-purple-400"></span>
              <span>FEATURES</span>
              <span className="size-1.5 rounded-full bg-purple-400"></span>
            </div>

            <h1 className="mt-10 text-center text-7xl font-bold text-stone-300 lg:w-[900px]">
              Smart Task Prioritization for Optimal Workflow
            </h1>

            <div className="mt-14 grid gap-8 md:grid-cols-1 lg:grid-cols-2">
              <div className="bg-stone-800 px-16 py-10">
                <div className="flex items-center justify-center gap-1 rounded-full bg-stone-700 px-2 py-2">
                  <button
                    onClick={() => setActive("kanban")}
                    className={`rounded-full px-6 py-2 text-xs ${active === "kanban" ? "bg-white/30 font-semibold" : ""}`}
                  >
                    Kanban
                  </button>
                  <button
                    onClick={() => setActive("list")}
                    className={`rounded-full px-6 py-2 text-xs ${active === "list" ? "bg-white/30 font-semibold" : ""}`}
                  >
                    List
                  </button>
                  <button
                    onClick={() => setActive("calendar")}
                    className={`rounded-full px-6 py-2 text-xs ${active === "calendar" ? "bg-white/30 font-semibold" : ""}`}
                  >
                    Calendar
                  </button>
                </div>

                {active === "kanban" ? (
                  <div>
                    <div className="mt-10 flex flex-col items-start gap-2 rounded-lg border border-white/10 px-6 py-6">
                      <span className="rounded-full bg-purple-600 px-4 py-1 text-xs font-semibold">
                        Design
                      </span>
                      <span className="text-sm font-semibold">
                        Presentation to the design team
                      </span>

                      <span className="mt-2 text-xs text-gray-300">
                        September 10, 2024
                      </span>
                      <span className="text-xs text-gray-300">
                        2:00 pm to 2:30 pm
                      </span>
                    </div>

                    <div className="mt-10 flex flex-col gap-2">
                      <h3 className="text-3xl font-semibold">
                        Customizable Views
                      </h3>
                      <span className="text-xs text-stone-400">
                        Easily switch between multiple views such as list,
                        calendar or kanban, allowing you to traitor your
                        workflow to your specific needs and preferences.
                      </span>
                    </div>
                  </div>
                ) : active === "list" ? (
                  <>
                    <div>
                      <span>Presentation to the design team</span>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>

              <div className="flex flex-col justify-evenly bg-stone-800 px-16 py-10">
                <div className="grid grid-cols-3">
                  <button>Fitness</button>
                  <button>Work Projects</button>
                  <button>Household Chores</button>
                  <button>Personal Goals</button>
                  <button>Finance</button>
                  <button>Travel Planning</button>
                  <button>Learning and Development</button>
                  <button>Health and Wellness</button>
                </div>

                <div className="mt-10 flex flex-col gap-2">
                  <h3 className="text-3xl font-semibold">Task Organization</h3>
                  <span className="text-xs text-stone-400">
                    Organize tasks into customizable categories like work,
                    personal, and health, ensuring a clear and structured
                    overview of your responsibilities.
                  </span>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default LandingPage;
