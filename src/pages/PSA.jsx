import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileScreen() {
  const fxRef = useRef(null);
  const titleRef = useRef(null);
  const editRef = useRef(null);
  const mohanRef = useRef(null);
  const kidsRef = useRef(null);

  const navigate = useNavigate();

  const fadeAll = () => {
    document.querySelectorAll(".profile-item").forEach(item => {
      item.classList.add("fade-out");
    });

    titleRef.current.classList.add("fade-out");
    editRef.current.classList.add("fade-out");
  };

  const animateCircle = (circle) => {
    const rect = circle.getBoundingClientRect();
    const clone = circle.cloneNode(true);

    Object.assign(clone.style, {
      position: "fixed",
      left: rect.left + "px",
      top: rect.top + "px",
      width: rect.width + "px",
      height: rect.height + "px",
      zIndex: 99999,
    });

    fxRef.current.appendChild(clone);
    circle.style.visibility = "hidden";

    const bottomX = window.innerWidth / 2 - rect.width / 2;
    const bottomY = window.innerHeight - rect.height * 1.5;

    const endX = window.innerWidth * 0.78;
    const endY = -35;

    const controlX = window.innerWidth * 0.8;
    const controlY = window.innerHeight * 0.45;

    clone.animate(
      [
        { transform: `translate(0,0) scale(1)` },
        { transform: `translate(${bottomX - rect.left}px, ${bottomY - rect.top}px) scale(1)` }
      ],
      { duration: 900, easing: "ease-in-out", fill: "forwards" }
    ).onfinish = () => {

      const frames = [];
      for (let t = 0; t <= 1; t += 0.022) {
        const x = (1 - t) * (1 - t) * bottomX + 2 * (1 - t) * t * controlX + t * t * endX;
        const y = (1 - t) * (1 - t) * bottomY + 2 * (1 - t) * t * controlY + t * t * endY;

        frames.push({
          transform: `translate(${x - rect.left}px, ${y - rect.top}px) scale(${1 - t * 0.55})`
        });
      }

      clone.animate(frames, {
        duration: 1400,
        easing: "linear",
        fill: "forwards",
      }).onfinish = () => {
        setTimeout(() => {
          navigate("/home");   // ✅ WAIT 1s BEFORE HOME
        }, 1000);
      };
    };
  };

  const handleClick = (ref) => {
    fadeAll();
    animateCircle(ref.current);
  };

  return (
    <>
      <style>{`
        :root{
          --bg:#0c0e12;
          --text:#fff;
          --smiley:#ffaa00;
          --kidsGrad1:#6a00ff;
          --kidsGrad2:#00b5ff;
          --addGrey:#8b8b8b;
        }
        *{margin:0;padding:0;box-sizing:border-box;}

        .react-body {
          height:100vh;
          background:var(--bg);
          color:var(--text);
          font-family:system-ui,Segoe UI,Roboto;
          display:flex;
          flex-direction:column;
        }

        header{text-align:center;padding:22px;position:relative;}
        .title{font-size:28px;font-weight:800;}
        .edit{position:absolute;right:18px;top:24px;opacity:.6;font-size:14px;}

        main{flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;}

        .profiles-top{display:flex;gap:40px;justify-content:center;}

        .profile-item{display:flex;flex-direction:column;align-items:center;gap:8px;transition:opacity .3s;}
        .profile{width:115px;height:115px;border-radius:50%;display:flex;justify-content:center;align-items:center;cursor:pointer;transition:transform .25s;}
        .profile:hover{ transform:scale(1.08); }

        #mohan{background:var(--smiley);position:relative;}
        #mohan::before,#mohan::after{
          content:"";position:absolute;width:12px;height:12px;
          border-radius:50%;background:black;top:38%;
        }
        #mohan::before{left:32%;} #mohan::after{right:32%;}
        #mohan span{
          position:absolute;width:60%;height:40%;
          border-bottom:6px solid black;border-radius:0 0 80px 80px;
          bottom:26%;
        }

        #kids{
          background:linear-gradient(135deg,var(--kidsGrad1),var(--kidsGrad2));
          font-size:26px;font-weight:900;
        }

        #add{background:var(--addGrey);font-size:32px;font-weight:900;margin-top:40px;}

        .label{font-size:15px;font-weight:600;}

        .fade-out{animation:fadeAway .35s forwards;}
        @keyframes fadeAway { to { opacity:0; filter:blur(4px); } }

        #fx { position:fixed; inset:0; pointer-events:none; z-index:99999; }
      `}</style>

      <div className="react-body">

        <header>
          <div className="title" ref={titleRef}>Who's watching?</div>
          <div className="edit" ref={editRef}>Edit</div>
        </header>

        <main>
          <div className="profiles-top">

            {/* Mohan circle */}
            <div className="profile-item">
              <div className="profile" id="mohan" ref={mohanRef}
                onClick={() => handleClick(mohanRef)}>
                <span></span>
              </div>
              <div className="label">Adult</div>
            </div>

            {/* Kids circle */}
            <div className="profile-item">
              <div className="profile" id="kids" ref={kidsRef}
                onClick={() => handleClick(kidsRef)}>
                KIDS
              </div>
              <div className="label">Kids</div>
            </div>

          </div>

          {/* Bottom Add circle */}
          <div className="profile-item">
            <div className="profile" id="add">+</div>
            <div className="label">Add</div>
          </div>

        </main>

        <div id="fx" ref={fxRef}></div>
      </div>
    </>
  );
}
