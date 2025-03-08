import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import MainLayout from "../layout/MainLayout";

export function NanoLampDemo() {
  return (
    <MainLayout>
      <div className="w-full min-h-[calc(100vh-12rem)] bg-black p-6">
        <div className="max-w-6xl mx-auto">
          <LampContainer className="h-[80vh] min-h-[500px]">
            <motion.h1
              initial={{ opacity: 0.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="mt-8 bg-gradient-to-br from-[#87CEEB] to-blue-600 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
            >
              Dreamscape <br /> UNLMTD
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="mt-4 text-center text-white/80 text-lg max-w-lg"
            >
              Visualize your dreams, manage your goals, and track your progress
              with Nano AI assistance
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.7,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <a
                href="/dreamboard"
                className="px-6 py-3 rounded-lg bg-[#87CEEB] text-black font-medium hover:bg-opacity-90 transition-all"
              >
                Explore Dream Board
              </a>
              <a
                href="/nano"
                className="px-6 py-3 rounded-lg border border-[#87CEEB] text-[#87CEEB] font-medium hover:bg-[#87CEEB] hover:bg-opacity-10 transition-all"
              >
                Chat with Nano
              </a>
            </motion.div>
          </LampContainer>
        </div>
      </div>
    </MainLayout>
  );
}

export default NanoLampDemo;
