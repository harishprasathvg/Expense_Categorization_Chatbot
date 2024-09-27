import { useNavigate } from "react-router-dom";
import React, { useState, useEffect,useCallback } from 'react';
import { initializeApp} from 'firebase/app';
import { getDownloadURL,getStorage ,ref} from 'firebase/storage';
import './seller.css';
import './sold.css'
import { Statistic } from 'antd';
import axios from "axios";
const { Countdown } = Statistic;


const firebaseConfig = {
  apiKey: "AIzaSyAfq8iaSv7IeZzOEr2IPZpbYLBxsdLNry0",
  authDomain: "auction-platform-17c91.firebaseapp.com",
  projectId: "auction-platform-17c91",
  storageBucket: "auction-platform-17c91.appspot.com",
  messagingSenderId: "659779739752",
  appId: "1:659779739752:web:570bdd168280a25133dbdd",
  measurementId: "G-LCMEZH5L1X"
};
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);


const Auction = ({ auction, onFinish }) => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [status, setStatus] = useState("Closed");
  const [classid, setClassid] = useState("box2");
  const [isHovered, setIsHovered] = useState(false);
  const today = new Date();
today.setHours(0, 0, 0, 0);
  const [value, setValue] = useState(today.getTime());
  
  const countdownFinish = useCallback(() => {
    setStatus("Closed");
    setClassid("sample1");
    onFinish();
  }, [onFinish]);
  

  const onShow = async () => {
    localStorage.setItem("auctionid",auction.id);
    navigate("./bidders");
  }
  
  const onClose = async () => {
    try {
      const data = localStorage.getItem("userdetails");
      let apicurrent = `http://localhost:8080/api/auctions/${auction.id}/close`;
      const response = await axios.get(apicurrent);
    } catch (error) {
      //console.error('closed failed');
      //setError('Invalid username or password. Please try again.'); // Set an error message
    }
    setStatus("Closed");
    setClassid("sample2");
    setValue(new Date(Date.now()));
  }
  onClose();
  const [imageUrl, setImageUrl] = useState(null);
  
  useEffect(() => {
    const imageName = auction.imageId+".jpg";
    const imageRef = ref(storage, imageName);
    
    getDownloadURL(imageRef)
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        //console.error('Error getting download URL:', error);
      });

    if (new Date(auction.auctionEndTime).getTime() <= Date.now()) {
      countdownFinish();
    }
    return () => {
      
    };
  }, [auction.id, auction.auctionEndTime, onFinish, countdownFinish]);
  return (
    
    <div className={`auction-container ${classid} ${isHovered ? 'hovered' : ''}`}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}>

      <p className="id">Id: {auction.id}</p>
      {status === "Active" ? (
        <>
          <p className="active">Active</p>
          <img className="icon" src={require('./icon1.jpg')} alt="Active Icon" />
        </>
      ) : (
        <>
          <p className="closed">Closed</p>
          <img className="icon" src={require('./icon2.jpg')} alt="Closed Icon" />
        </>
      )}
      <Countdown className="countdown"
        value={value}
        format="HH:mm:ss"
        onFinish={countdownFinish}
      />
      {imageUrl && <img className="image" src={imageUrl} alt="Auction" />}
      <p className="name">Name: {auction.itemname}</p>
      {/*<p>Starting Price: {auction.startingPrice}</p>*/}
      <p className="curamount2">Sold Amount:<br /> 
        {auction.currentHighestBid !== 0 ? `${auction.currentHighestBid}rs` : `${auction.startingPrice}rs`}
      </p>

      <p className="highest2">
        Buyer : <br />
        {auction.highbidder !== null ? auction.highbidder : "No Bidders Yet"}
      </p>

      <p className="description2">Product Description :{auction.itemDescription}</p>
      <button className="show2" onClick={onShow}>Show Bidders</button>
    </div>
  );
};
const Sold = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const isloggedin =  localStorage.getItem('userdetails');
  if(isloggedin === "null"){
   navigate('/auth');
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/auctions/closed');
        setAuctions(response.data);
      } catch (error) {
        //console.error('Error fetching auction data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const [flag,setFlag]= useState(false);
  useEffect(() => {
    if (auctions.filter((auction) => auction.seller.username === username).length !== 0) {
      setFlag(true);
    }
  }, [loading, auctions, username]);
  
  return (
    <div>
      {loading ? (
        <p>Loading auctions...</p>
      ) : (
        <div>
          {flag && <h2 className="heading">Sold Products</h2>}
        <div className="main">
          {auctions.filter((auction) => auction.seller.username === username).length === 0 ? (
            <p className="mess0">Currently No Products Sold</p>
          ) : (
            auctions
              .filter((auction) => auction.seller.username === username)
              .map((auction) => (
                <Auction key={auction.id} auction={auction} onFinish={() => {
                  // Callback function for onFinish event
                }} />
              ))
          )}
        </div>
        </div>
      )}
    </div>
  );
};

export default Sold;
