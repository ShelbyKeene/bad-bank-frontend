import React from "react";
import Card from "react-bootstrap/Card";
import HomePic from "../Photos/homePG.jpeg";
import Image from "react-bootstrap/Image";
import Logo from "../Photos/logoPIC.png";
const Home = () => {
  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <Image
        src={HomePic}
        fluid
        style={{ height: "100%", width: "100%", objectFit: "cover" }}
      />

      <Card
        style={{
          width: "85%",
          height: "100%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity as needed (0.5 = 50% opacity)
        }}
        className=" text-white"
      >
        <Card.Img />
        <Card.ImgOverlay>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Card.Title>
              <h1 style={{ textAlign: "center" }}>
                French Quarter Financial Bank
              </h1>
            </Card.Title>
            <Image
              src={Logo}
              fluid
              style={{ height: "100px", width: "100px", margin: "0 auto" }}
            />
          </div>
          <Card.Text>
            Welcome to French Quarter Financial Bank, your trusted banking
            partner in the heart of New Orleans. With our deep-rooted commitment
            to excellence, we offer a range of financial solutions tailored to
            meet your unique needs. Whether you're looking to manage your
            accounts, access convenient online banking services, apply for a
            loan, or seek expert advice from our dedicated team of
            professionals, French Quarter Financial Bank is here to provide you
            with personalized service and a seamless banking experience.
            Discover the essence of exceptional banking fused with the vibrant
            spirit of the French Quarter at French Quarter Financial Bank.
          </Card.Text>
        </Card.ImgOverlay>
      </Card>
    </div>
  );
};

export default Home;