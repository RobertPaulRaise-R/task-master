import { motion } from "motion/react"
import { ReactNode } from "react";

function NavLink({ children, delay }: { children: ReactNode, delay: number }) {
    return (
        <motion.a
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: delay }}
              className="hover:underline"
            >
            {children}
        </motion.a>
    );
}

export default NavLink;
