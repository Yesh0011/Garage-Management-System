import React, { useState, useEffect, useRef } from "react";
import Switch from "react-switch";
import QrScanner from "qr-scanner";

const QRScanner = () => {
  const videoElementRef = useRef(null);
  const fileInputRef = useRef(null); // Reference to the file input element
  const [scannedEvent, setScannedEvent] = useState("");
  const [scannedUser, setScannedUser] = useState("");
  const [quantity, setQuantity] = useState();
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isActiveMark, setIsActiveMark] = useState(false);

  useEffect(() => {
    if (isVideoOn) {
      const video = videoElementRef.current;
      const qrScanner = new QrScanner(
        video,
        (result) => {
          const cleanedDataString = result.data.replace(/\\/g, "").replace(/^"|"$/g, "");
          const dataObject = JSON.parse(cleanedDataString);

          setScannedEvent(dataObject.eventId);
          setScannedUser(dataObject.useId);
          setQuantity(dataObject.class.ticket);
          setIsActiveMark(true);
        },
        {
          returnDetailedScanResult: true,
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );
      qrScanner.start();

      return () => {
        qrScanner.stop();
        qrScanner.destroy();
      };
    }
  }, [isVideoOn]);

  async function handleMarkAttendance() {
    if (!scannedEvent || !scannedUser || !quantity) {
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/attendant/markAttendant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId: scannedEvent,
        userId: scannedUser,
        ticketType: quantity,
      }),
    });

    if (!res.ok) {
      error("Failed to mark attendance");
      return;
    }

    const data = await res.json();
    if (data.message === "User Already Attending") {
      error("User Already Attending");
      return;
    }

    success("Attendance marked successfully");
    setScannedEvent("");
    setScannedUser("");
    setQuantity();
  }

  function handleChange() {
    setIsVideoOn(!isVideoOn);
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    // Use file variable for further processing (e.g., reading QR code from the file)
  }

  return (
    <div>
      <div className="lg:pl-10 mb-5 grid gap-2 mt-8 md:mr-10 pb-8">
        <div className=" font-mono text-custom-orange font-medium text-3xl">QR READER</div>
        <div className=" text-[#455273] font-mono mr-8">Turn on the camera or upload a QR code image</div>
      </div>
      <div className="flex gap-10 items-center">
        <div className="flex flex-col gap-5 justify-center items-center">
          <Switch
            className="grid self-center"
            onChange={handleChange}
            checked={isVideoOn}
            offColor="#E9E9E9"
            onColor="#D47151"
            offHandleColor="#D47151"
            onHandleColor="#E9E9E9"
            height={20}
            width={40}
          />
          <div className="flex align items-center justify-center mb-3">
            <input
              type="file"
              accept="image/*" // Allow only image files
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <button onClick={() => fileInputRef.current.click()} className="button p-2 rounded-full bg-slate-400 text-white font-bold">
              Upload QR Code
            </button>
          </div>
          <video className="object-cover border-2 border-solid w-64 h-64" ref={videoElementRef} />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <p className="scannedText font-bold text-lg">Event id:<span className="text-slate-400"> {scannedEvent}</span></p>
            <p className="scannedText font-bold text-lg">User id:<span className="text-slate-400"> {scannedUser}</span></p>
            <p className="quantity font-bold text-lg">Ticket Type: <span className="text-slate-400"> {quantity}</span></p>
          </div>
          <button
            onClick={handleMarkAttendance}
            className={`button p-2 rounded-full text-white font-bold ${isActiveMark ? "bg-custom-orange" : "bg-slate-400"}`}
          >
            Mark the attendance
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
