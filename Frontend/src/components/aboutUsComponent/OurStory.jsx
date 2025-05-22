import { motion } from "framer-motion";

const OurStory = () => {
    // Animation configurations for smooth transition
    const animationProps = {
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 1, ease: "easeOut" },
    };

    return (
        <section id="our-story" className="relative py-16 px-6 bg-gray-50">
            {/* Full Width Background Image */}
            <div className="absolute inset-0 -z-10">
                <img
                    src="/cOverview.jpg"
                    alt="Our Story"
                    className="w-3/4 h-auto rounded-xl shadow-lg"
                />
            </div>

            <div className="max-w-6xl mx-auto text-center">
                {/* Section Title */}
                <motion.h2
                    {...animationProps}
                    className="text-4xl md:text-6xl font-semibold text-amber-600 mb-8"
                >
                    Our Story
                </motion.h2>

                {/* Section Subtitle */}
                <motion.p
                    {...animationProps}
                    transition={{ ...animationProps.transition, duration: 1.2 }}
                    className="text-lg md:text-2xl text-gray-700 mb-16 mx-auto max-w-3xl"
                >
                    A journey built on vision, innovation, and relentless pursuit of excellence.
                </motion.p>

                {/* Timeline of Key Events */}
                <div className="space-y-16">
                    {/* Milestone 1 */}
                    <motion.div
                        {...animationProps}
                        transition={{ ...animationProps.transition, duration: 1.4 }}
                        className="relative flex items-center justify-between"
                    >
                        {/* Text Section */}
                        <div className="w-1/2 pr-8">
                            <h3 className="text-3xl font-semibold text-amber-600 mb-4">The Beginning</h3>
                            <p className="text-lg text-gray-700">
                                In 2015, we embarked on a journey to simplify the booking process for boarding houses and provide the best possible experiences for our users.
                            </p>
                        </div>

                        {/* Image Section */}
                        <motion.div
                            {...animationProps}
                            transition={{ ...animationProps.transition, duration: 1.6 }}
                            className="w-1/2 flex justify-center"
                        >
                            <img
                                src="/cOverview.jpg"
                                alt="The Beginning"
                                className="w-3/4 h-auto rounded-xl shadow-lg"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Milestone 2 */}
                    <motion.div
                        {...animationProps}
                        transition={{ ...animationProps.transition, duration: 1.6 }}
                        className="relative flex items-center justify-between flex-row-reverse"
                    >
                        {/* Text Section */}
                        <div className="w-1/2 pl-8">
                            <h3 className="text-3xl font-semibold text-amber-600 mb-4">Our First Big Break</h3>
                            <p className="text-lg text-gray-700">
                                In 2017, our mobile app launch changed the game, making it easier for users to find and book boarding houses with just a few taps.
                            </p>
                        </div>

                        {/* Image Section */}
                        <motion.div
                            {...animationProps}
                            transition={{ ...animationProps.transition, duration: 1.8 }}
                            className="w-1/2 flex justify-center"
                        >
                            <img
                                src="/cOverview.jpg"
                                alt="First Break"
                                className="w-3/4 h-auto rounded-xl shadow-lg"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Milestone 3 */}
                    <motion.div
                        {...animationProps}
                        transition={{ ...animationProps.transition, duration: 1.8 }}
                        className="relative flex items-center justify-between"
                    >
                        {/* Text Section */}
                        <div className="w-1/2 pr-8">
                            <h3 className="text-3xl font-semibold text-amber-600 mb-4">Global Expansion</h3>
                            <p className="text-lg text-gray-700">
                                By 2020, we expanded to new countries, bringing our innovative platform to thousands of users worldwide.
                            </p>
                        </div>

                        {/* Image Section */}
                        <motion.div
                            {...animationProps}
                            transition={{ ...animationProps.transition, duration: 2 }}
                            className="w-1/2 flex justify-center"
                        >
                            <img
                                src="/cOverview.jpg"
                                alt="Our Story"
                                className="w-3/4 h-auto rounded-xl shadow-lg"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default OurStory;
