import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import {
  motion,
  useAnimation,
  useScroll,
} from "framer-motion";
import users from "../assets/users.png";
import userBoy from "../assets/userBoy.png";
import userGirl from "../assets/userGirl.png";
import rocket from "../assets/rocket.png";
import chain from "../assets/chain.png";
import trophy from "../assets/trophy.png";
import { useInView } from "react-intersection-observer";
import { debounce } from "lodash"; 
import logo from "../assets/logo.png"

const SmallScreenContainer = styled(motion.div)`
  display: none;
  min-height: 100vh;
  background: linear-gradient(135deg, #000000 0%, #333333 100%);
  padding: 20px;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media (max-width: 1000px) {
    display: flex;
  }
`;

const MessageCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 20px;
  max-width: 600px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px 0 rgba(157, 30, 30, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const MessageTitle = styled.h1`
  font-size: 24px;
  background: radial-gradient(64.18% 64.18% at 71.16% 35.69%, #e09d9d .89%, #e38181 17.23%, #e36464 42.04%, #e34444 55.12%, #e32727 71.54%, #e00202 100%);
  margin-bottom: 20px;
  font-family: "Poppins", sans-serif;
  background-clip: text;
  -webkit-text-fill-color: #0000;
`;

const MessageText = styled.p`
  font-size: 14px;
  color: #ffffff;
  line-height: 1.6;
  margin-bottom: 30px;
  font-family: "Poppins", sans-serif;
`;

const DeviceIcon = styled(motion.div)`
  font-size: 48px;
  color: #ff0000;
  margin-bottom: 20px;
`;

const HomeContainer = styled(motion.div)`
@media (max-width: 1000px) {
    display: none;
  }
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
@media (max-width: 1000px) {
    display: none;
  }
 @media (min-width: 1001px) and (max-width: 1350px) {
    padding: 100px 100px;
  }
@media (min-width:1351px) {
    padding: 100px 250px;
  }
  background: linear-gradient(135deg, #000000 0%, #333333 100%);
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
  @media (max-width: 1000px) {
    display: none;
  }
  @media (min-width: 1001px) and (max-width: 1350px) {
    padding: 50px 60px;
  }
  @media (min-width: 1351px) {
    padding: 50px 120px;
  }
  background: linear-gradient(135deg, #333333 0%, #000000 100%);
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
  
  @media (min-width: 1001px) and (max-width: 1350px) {
    font-size: 40px;
    margin-bottom: 40px;
  }
`;

const WhatYouLearnContent = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
  gap: 40px;

  @media (min-width: 1001px) and (max-width: 1350px) {
    gap: 20px;
  }
`;

const RoadmapStep = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 50px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  max-width: 500px;

  @media (min-width: 1001px) and (max-width: 1350px) {
    padding: 15px;
    margin-bottom: 40px;
  }

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

    @media (min-width: 1001px) and (max-width: 1350px) {
      bottom: -40px;
    }
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

  @media (min-width: 1001px) and (max-width: 1350px) {
    font-size: 18px;
    margin-bottom: 8px;
  }
`;

const StepDescription = styled(motion.p)`
  font-size: 14px;
  color: #ffffff;

  @media (min-width: 1001px) and (max-width: 1350px) {
    font-size: 13px;
  }
`;

const StickyImageContainer = styled(motion.div)`
  position: sticky;
  top: 100px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media (min-width: 1001px) and (max-width: 1350px) {
    img {
      width: 400px;
      height: 400px;
    }
  }
`;

const FooterContainer = styled(motion.footer)`
@media (max-width: 1000px) {
    display: none;
  }
  background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
  padding: 50px 120px;
  color: #000000;
  font-family: "Poppins", sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 50vh;
`;

const FooterContent = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 50%;
`;

const FooterLogo = styled.h1`
  font-size: 24px;
  color: #000000;
  margin: 0;
  font-weight: 800;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  display:flex;
  align-items:center;
`;

const FooterDescription = styled.p`
  font-size: 14px;
  color: #333333;
  line-height: 1.6;
`;

const Copyright = styled.p`
  font-size: 12px;
  color: #fff;
  font-family: "Poppins", sans-serif;
  // margin:auto;
  display:flex;
  justify-content:center;
  background:black;
  padding:10px;
  margin:0;
`;

const LogoImage= styled.img`
  width:60px;
  height:60px;
  margin-right:10px;
`

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


const Homepage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const roadmapSteps = [
    {
      title: "Create a TronLink Wallet",
      description: "Set up your digital wallet to interact with the Tron blockchain.",
    },
    {
      title: "Connect Wallet to a Website",
      description:
        "Learn to link your TronLink wallet for seamless blockchain interactions.",
    },
    {
      title: "Mastering TronLink",
      description:
        " Learn Energy, Bandwidth, Freezing, and Staking to navigate the Tron ecosystem efficiently.",
    },
    {
      title: "Sign A transaction",
      description:
        "Understand the process of authorizing and signing blockchain transactions securely.",
    },
    {
      title: "Obtain TRX Tokens",
      description:
      "Acquire TRX tokens to fuel your transactions on the Tron network.",
    },
    {
      title: "Understand TRC-20 Tokens",
      description: "Learn about TRC-20 token standard and its applications in decentralized apps.",
    },
    {
      title: "Send TRX to Another Address",
      description:
        "Practice transferring TRX tokens between different Tron blockchain addresses.",
    },
    {
      title: "Stake TRX for Energy",
      description: "Explore staking mechanisms to gain Energy for smart contract interactions.",
    },
    {
      title: "Approve Tokens for transfer and Transfer TRC20 Tokens",
      description: "Learn to authorize and execute TRC20 token transfers securely",
    },
    {
      title: "View Transaction",
      description:
        "Explore transaction details and track your Tron network activities effectively",
    },
    {
      title: "Get Certificate for completed Tasks",
      description:
        "Earn recognition for your achievements in mastering Tron network operations",
    },
  ];

  const handleStartClick = (e) => {
    e.preventDefault();
    window.location.href = "https://tronxplore-app.vercel.app/";
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

  const smallScreenVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const iconVar = {
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0],
      transition: { duration: 2, repeat: Infinity }
    }
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
    <SmallScreenContainer>
        <MessageCard
          initial="initial"
          animate="animate"
          variants={smallScreenVariants}
        >
          <DeviceIcon
            animate="animate"
            variants={iconVar}
          >
            💻
          </DeviceIcon>
          <MessageTitle>Your Adventure Awaits on a Bigger Screen!</MessageTitle>
          <MessageText>
            TRONXPLORE's immersive blockchain learning experience is optimized for larger displays. 
            Grab your laptop or desktop to unlock the full potential of your tron blockchain journey with 
            interactive quests, real-time demonstrations, and exciting challenges.
          </MessageText>
        </MessageCard>
      </SmallScreenContainer>
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

    <FooterContainer
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <StyledImage
            src={userGirl}
            alt="Girl character"
            width={400}
            height={400}
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
        <FooterContent variants={itemVariants}>
          <FooterLogo>
          <LogoImage src={logo} alt="TRONXPLORE Logo" />
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
          </FooterLogo>
          <FooterDescription>
            Embark on an exciting journey into the world of blockchain technology. Our platform offers a unique, gamified experience to help you understand and excel in the TRON ecosystem. Through interactive quests, hands-on blockchain interactions, and NFT certifications, TRONXPLORE makes learning about blockchain fun and rewarding.
          </FooterDescription>
        </FooterContent>
      </FooterContainer>
      <Copyright>© 2024 TRONXPLORE. All rights reserved.</Copyright>
    </>
  );
};

export default Homepage;
