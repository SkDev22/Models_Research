import { motion } from "framer-motion";
import {
    IconBrandFacebook, IconBrandTwitter, IconBrandInstagram, IconMail,
    IconPhone, IconMapPin, IconBrandLinkedin
} from "@tabler/icons-react";

const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } }
};

const linkHover = {
    hover: { scale: 1.1, color: "#fbbf24", transition: { duration: 0.3 } }
};

const Footer = () => {
    return (
        <motion.footer
            className="bg-gray-900 text-gray-300 py-12"
            initial="hidden"
            animate="visible"
            variants={footerVariants}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Brand & About */}
                <motion.div whileHover={{ scale: 1.02 }}>
                    <h2 className="text-xl font-semibold text-white">LodgeLink</h2>
                    <p className="mt-2 text-gray-400 text-sm">
                        Elevating digital experiences with seamless design & modern solutions.
                    </p>
                    <div className="mt-4 flex items-center space-x-3 text-gray-400">
                        <IconMapPin size={18} />
                        <span className="text-sm">Malambe, Sri Lanka</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-400 mt-1">
                        <IconPhone size={18} />
                        <span className="text-sm">+123 456 7890</span>
                    </div>
                </motion.div>

                {/* Quick Links */}
                <motion.div>
                    <h3 className="text-white font-medium">Quick Links</h3>
                    <ul className="mt-3 space-y-2">
                        {["Home", "About Us", "Our Services", "Blog", "Contact"].map((item, index) => (
                            <motion.li key={index} whileHover="hover" variants={linkHover}>
                                <a href="#">{item}</a>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                {/* Support & Legal */}
                <motion.div>
                    <h3 className="text-white font-medium">Support</h3>
                    <ul className="mt-3 space-y-2">
                        {["FAQs", "Help Center", "Privacy Policy", "Terms & Conditions"].map((item, index) => (
                            <motion.li key={index} whileHover="hover" variants={linkHover}>
                                <a href="#">{item}</a>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                {/* Newsletter */}
                <motion.div>
                    <h3 className="text-white font-medium">Subscribe to Our Newsletter</h3>
                    <p className="text-gray-400 text-sm mt-2">
                        Stay updated with our latest insights and offers.
                    </p>
                    <form className="mt-3 flex items-center w-full max-w-md">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-2 text-gray-900 rounded-l-md border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none h-10 transition-all duration-200"
                        />
                        <motion.button
                            type="submit"
                            className="bg-amber-500 px-4 py-2 text-white rounded-r-md hover:bg-amber-600 transition duration-300 h-10 flex items-center"
                            whileHover={{ scale: 1.05 }}
                        >
                            Subscribe
                        </motion.button>
                    </form>


                    {/* Social Media Links */}
                    <motion.div className="flex space-x-4 mt-4">
                        {[IconBrandFacebook, IconBrandTwitter, IconBrandInstagram, IconBrandLinkedin, IconMail].map((Icon, index) => (
                            <motion.a
                                key={index}
                                href="#"
                                className="text-gray-400 hover:text-amber-500 transition duration-300"
                                whileHover={{ scale: 1.2, color: "#fbbf24", transition: { duration: 0.3 } }}
                            >
                                <Icon size={22} />
                            </motion.a>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Copyright */}
            <motion.div
                className="mt-10 border-t border-gray-700 pt-5 text-center text-sm text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 1, delay: 0.5 } }}
            >
                © {new Date().getFullYear()} LodgeLink. All rights reserved.
            </motion.div>
        </motion.footer>
    );
};

export default Footer;
