import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import users from "../assets/users.png";
import userBoy from "../assets/userBoy.png";
import userGirl from "../assets/userGirl.png";
import rocket from "../assets/rocket.png";
import chain from "../assets/chain.png";
import trophy from "../assets/trophy.png";
import { useNavigate } from "react-router-dom";

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
`;

const WhatYouLearnContent = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const LearnGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  flex: 1;
  margin: 80px 80px 80px 0;
`;

const LearnCard = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(255, 0, 0, 0.2);
  }
`;

const LearnCardTitle = styled(motion.h3)`
  font-size: 20px;
  color: #ff0000;
  margin-bottom: 10px;
  font-weight: 500;
`;

const LearnCardDescription = styled(motion.p)`
  font-size: 14px;
  color: #ffffff;
`;

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
  const navigate = useNavigate();

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

      <WhatYouLearnContainer
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <WhatYouLearnTitle variants={itemVariants}>
          What you learn
        </WhatYouLearnTitle>
        <WhatYouLearnContent>
          <LearnGrid variants={containerVariants}>
            <LearnCard variants={cardVariants} whileHover="hover">
              <LearnCardTitle variants={itemVariants}>
                Bandwidth and Energy
              </LearnCardTitle>
              <LearnCardDescription variants={itemVariants}>
                Understand how bandwidth and energy work in the TRON network,
                optimizing your transactions.
              </LearnCardDescription>
            </LearnCard>
            <LearnCard variants={cardVariants} whileHover="hover">
              <LearnCardTitle variants={itemVariants}>
                Mint TRC20 Tokens
              </LearnCardTitle>
              <LearnCardDescription variants={itemVariants}>
                Learn to create and deploy your own TRC20 tokens on the TRON
                blockchain.
              </LearnCardDescription>
            </LearnCard>
            <LearnCard variants={cardVariants} whileHover="hover">
              <LearnCardTitle variants={itemVariants}>
                Get TRX Tokens
              </LearnCardTitle>
              <LearnCardDescription variants={itemVariants}>
                Discover how to acquire and manage TRX, the native
                cryptocurrency of the TRON network.
              </LearnCardDescription>
            </LearnCard>
            <LearnCard variants={cardVariants} whileHover="hover">
              <LearnCardTitle variants={itemVariants}>
                Earn NFT Certificates
              </LearnCardTitle>
              <LearnCardDescription variants={itemVariants}>
                Complete tasks and challenges to earn unique NFT certificates,
                showcasing your blockchain expertise.
              </LearnCardDescription>
            </LearnCard>
          </LearnGrid>
          <motion.div variants={itemVariants}>
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
          </motion.div>
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
