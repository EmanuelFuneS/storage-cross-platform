import { Card } from "@workspace/ui/components/card";
import Typography from "@workspace/ui/components/typography";
import React from "react";
import FeatureCard from "@/components/card-items/featureCard";

const Features = () => {
  return (
    <section
      id="features"
      className="flex-1 flex flex-col items-center lg:items-start justify-center space-y-8 min-h-screen m-10 lg:m-2 py-15"
    >
      <div className="space-y-4 text-center lg:text-start lg:w-2/4">
        <Typography as="h2" type="headline">
          Why choose StorageBox?
        </Typography>
        <Typography as="p" type="body">
          We privide the most secure and reliable cloud storage solution for
          individuals and businesses alike.
        </Typography>
      </div>
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
        <FeatureCard title="End-to-End Encryption">
          Your data is encripted before it even leaves your device, ensuring
          total privacy and security.
        </FeatureCard>
        <FeatureCard title="Instant Sync">
          Changes made on one device are instantly update across all your
          connected plataforms seamlessly.
        </FeatureCard>
        <FeatureCard title="Smart Collaboration">
          Share folder and work together in realtime with granular permission
          controls and activity logs.
        </FeatureCard>
      </div>
    </section>
  );
};

export default Features;
