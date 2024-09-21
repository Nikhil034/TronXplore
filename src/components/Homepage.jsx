import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import {
  motion,
  useAnimation,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import users from "../assets/users.png";
import userBoy from "../assets/userBoy.png";
import userGirl from "../assets/userGirl.png";
import rocket from "../assets/rocket.png";
import chain from "../assets/chain.png";
import trophy from "../assets/trophy.png";
import { useInView } from "react-intersection-observer";
import { debounce } from "lodash"; 

const HomeContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
  font-size: 24px;
  color: #000000;
  padding: 50px 100px;
  font-family: "Poppins", sans-serif;
  overflow: hidden;
`;

const Left = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Logo = styled(motion.h1)`
  display: flex;
  align-items: center;
  font-size: 24px;
  color: #000000;
  margin: 0;
  font-weight: 800;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled(motion.h2)`
  font-size: 36px;
  color: #000000;
  margin: 0;
  max-width: 500px;
  line-height: 1.2;
`;

const StartButton = styled(motion.button)`
  background: linear-gradient(45deg, #ff0000, #cc0000);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: fit-content;
  font-weight: 800;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  &::after {
    content: "→";
    margin-left: 10px;
  }
`;

const Right = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const StyledImage = styled(motion.img)`
  max-width: 100%;
  height: auto;
`;

const KeyFeaturesContainer = styled(motion.div)`
  background: linear-gradient(135deg, #000000 0%, #333333 100%);
  padding: 100px 250px;
  color: white;
  font-family: "Poppins", sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const KeyFeaturesTitle = styled(motion.h2)`
  font-size: 45px;
  text-align: center;
  margin-bottom: 180px;
  color: #ffffff;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(255, 0, 0, 0.2);
`;

const FeaturesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
`;

const FeatureCard = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 115px 30px 30px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: visible;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const FeatureIcon = styled(motion.img)`
  position: absolute;
  object-fit: cover;
  top: -70px;
  width: 150px;
  height: 150px;
  filter: drop-shadow(0 5px 10px rgba(255, 0, 0, 0.1));
`;

const FeatureTitle = styled(motion.h3)`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 12px;
  color: #ff0000;
`;

const FeatureDescription = styled(motion.p)`
  font-size: 14px;
  color: #ffffff;
`;

const WhatYouLearnContainer = styled(motion.div)`
  background: linear-gradient(135deg, #333333 0%, #000000 100%);
  padding: 50px 120px;
  color: white;
  font-family: "Poppins", sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const WhatYouLearnTitle = styled(motion.h2)`
  font-size: 45px;
  color: #ffffff;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(255, 0, 0, 0.2);
  margin-bottom: 50px;
`;

const WhatYouLearnContent = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
`;


const RoadmapStep = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 50px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  // transition: all 0.3s ease;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: -30px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background-color: #ff0000;
    border-radius: 50%;
    box-shadow: 0 0 0 5px rgba(255, 0, 0, 0.2);
  }

  &::after {
    content: "";
    position: absolute;
    left: -20px;
    top: 100%;
    bottom: -50px;
    width: 2px;
    background-color: rgba(255, 0, 0, 0.5);
  }

  &:last-child::after {
    display: none;
  }
`;

const StepTitle = styled(motion.h3)`
  font-size: 20px;
  color: #ff0000;
  margin-bottom: 10px;
  font-weight: 500;
`;

const StepDescription = styled(motion.p)`
  font-size: 14px;
  color: #ffffff;
`;

const StickyImageContainer = styled(motion.div)`
  position: sticky;
  top: 100px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const StepComponent = ({ step }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  const [hasAnimated, setHasAnimated] = useState(false);

  const debouncedAnimate = debounce((isInView) => {
    if (isInView && !hasAnimated) {
      controls.start("visible");
      setHasAnimated(true);
    } else if (!isInView && hasAnimated) {
      controls.start("hidden");
      setHasAnimated(false);
    }
  }, 50); // Adjust this value to fine-tune the smoothness

  useEffect(() => {
    debouncedAnimate(inView);
    return () => debouncedAnimate.cancel();
  }, [inView, debouncedAnimate]);

  return (
    <RoadmapStep
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { duration: 0.9, ease: "easeIn" } 
        },
        hidden: { 
          opacity: 0, 
          y: 50, 
          transition: { duration: 0.9, ease: "easeOut" } 
        },
      }}
    >
      <StepTitle>{step.title}</StepTitle>
      <StepDescription>{step.description}</StepDescription>
    </RoadmapStep>
  );
};

const RoadmapContainer = ({ roadmapSteps }) => {
  return (
    <div>
      {roadmapSteps.map((step, index) => (
        <StepComponent key={index} step={step} />
      ))}
    </div>
  );
};

const JoinUsContainer = styled(motion.div)`
  background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
  padding: 50px 120px;
  color: #000000;
  font-family: "Poppins", sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
`;

const JoinUsContent = styled(motion.div)`
  flex: 1;
  max-width: 500px;
`;

const JoinUsTitle = styled(motion.h2)`
  font-size: 45px;
  font-weight: 600;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(255, 0, 0, 0.1);
`;

const JoinUsDescription = styled(motion.p)`
  font-size: 18px;
  margin-bottom: 30px;
`;

const SignUpButton = styled(motion.button)`
  background: linear-gradient(45deg, #ff0000, #cc0000);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: fit-content;
  font-weight: 800;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(255, 0, 0, 0.15);
  }

  &::after {
    content: "→";
    margin-left: 10px;
  }
`;

const Homepage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const roadmapSteps = [
    {
      title: "Create A wallet",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      title: "Connect Wallet to a website",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      title: "Sign A transaction",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    },
    {
      title: "Get Test Trx",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
    },
    {
      title: "Send Trx to an Address",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui.",
    },
    {
      title: "Check Bandwidth and Energy used",
      description: "Officia deserunt mollit anim id est laborum.",
    },
    {
      title: "Get Energy for use by staking",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      title: "Mint TRC20 Tokens",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      title: "Approve Tokens for transfer and Transfer TRC20 Tokens",
      description: "Ut enim ad minim veniam, quis nostrud exercitation.",
    },
    {
      title: "View Transaction",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
    },
    {
      title: "Get Certificate for completed Tasks",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
    },
  ];

  const handleStartClick = (e) => {
    e.preventDefault();
    window.location.href = "https://sky-office.co/";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
    hover: {
      scale: 1.1,
      rotate: [0, -10, 10, -10, 0],
      transition: { duration: 0.3 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      <HomeContainer
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Left>
          <Logo variants={itemVariants}>
            TRON
            <motion.span
              style={{ color: "#ff0000", fontSize: "35px" }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              X
            </motion.span>
            PLORE
          </Logo>
          <Title variants={itemVariants}>
            A gamified platform to understand, explore, and excel in the Tron
            blockchain ecosystem.
          </Title>
          <StartButton
            onClick={handleStartClick}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            START NOW
          </StartButton>
        </Left>
        <Right variants={itemVariants}>
          <StyledImage
            src={users}
            alt="TRONXPLORE characters"
            width={570}
            height={570}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </Right>
      </HomeContainer>

      <KeyFeaturesContainer
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <KeyFeaturesTitle variants={itemVariants}>
          Key Features
        </KeyFeaturesTitle>
        <FeaturesGrid variants={containerVariants}>
          <FeatureCard variants={cardVariants} whileHover="hover">
            <FeatureIcon
              src={rocket}
              alt="Heart icon"
              variants={iconVariants}
              whileHover="hover"
            />
            <FeatureTitle variants={itemVariants}>
              Gamified Learning Quests
            </FeatureTitle>
            <FeatureDescription variants={itemVariants}>
              Engage in interactive quests designed to make learning about
              blockchain fun and rewarding.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard variants={cardVariants} whileHover="hover">
            <FeatureIcon
              src={chain}
              alt="Speaker icon"
              variants={iconVariants}
              whileHover="hover"
            />
            <FeatureTitle variants={itemVariants}>
              Blockchain Interaction
            </FeatureTitle>
            <FeatureDescription variants={itemVariants}>
              Get hands-on experience with real blockchain transactions in a
              safe, guided environment.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard variants={cardVariants} whileHover="hover">
            <FeatureIcon
              src={trophy}
              alt="Rocket icon"
              variants={iconVariants}
              whileHover="hover"
            />
            <FeatureTitle variants={itemVariants}>
              NFT Certification
            </FeatureTitle>
            <FeatureDescription variants={itemVariants}>
              Earn unique NFT certificates as you complete challenges and master
              new skills.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </KeyFeaturesContainer>

      <WhatYouLearnContainer>
      <WhatYouLearnTitle
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your Learning Roadmap
      </WhatYouLearnTitle>
      <WhatYouLearnContent>
        <RoadmapContainer roadmapSteps={roadmapSteps} />
        <StickyImageContainer>
          <StyledImage
            src={userBoy}
            alt="Boy playing with blocks"
            width={450}
            height={450}
            animate={{
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </StickyImageContainer>
      </WhatYouLearnContent>
    </WhatYouLearnContainer>

      <JoinUsContainer
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <StyledImage
            src={userGirl}
            alt="Girl character"
            width={650}
            height={650}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
        <JoinUsContent variants={itemVariants}>
          <JoinUsTitle>Join us</JoinUsTitle>
          <JoinUsDescription>
            Embark on an exciting journey into the world of blockchain
            technology. Our platform offers a unique, gamified experience to
            help you understand and excel in the TRON ecosystem.
          </JoinUsDescription>
          <SignUpButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            SIGN UP NOW
          </SignUpButton>
        </JoinUsContent>
      </JoinUsContainer>
    </>
  );
};

export default Homepage;
