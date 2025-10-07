
// import React from "react";

// const SeatGrid = ({ selectedSeats, bookedSeats, onSeatClick }) => {

//   const toggleSeat = (id) => {
//     if (bookedSeats.includes(id)) return; // already booked
//     onSeatClick(id);
//   };

//   const createSeat = (id) => {
//     let seatClass = "seat";
//     if (bookedSeats.includes(id)) seatClass += " pre-selected";
//     else if (selectedSeats.includes(id)) seatClass += " selected";

//     return <div key={id} className={seatClass} onClick={() => toggleSeat(id)} />;
//   };

//   const createEmptySeat = (id) => <div key={id} className="empty-seat" />;

//   return (
//     <>
//       <style>{`
//         body {
//           background-color: #111;
//           display: flex;
//           justify-content: center;
//           align-items: flex-start;
//           min-height: 100vh;
//           margin: 0;
//           padding-top: 30px;
//         }

//         .theatre {
//           display: flex;
//           align-items: flex-start;
//           gap: 20px;
//         }

//         .screen {
//           width: 680px;
//           height: 30px;
//           background-color: #ccc;
//           color: #111;
//           text-align: center;
//           line-height: 30px;
//           font-weight: bold;
//           border-radius: 40% / 100%;
//           margin: 0 auto 20px auto;
//           box-shadow: 0 0 10px #888;
//         }

//         .side-column {
//           display: grid;
//           grid-template-columns: repeat(4, 1fr);
//           gap: 6px 6px;
//         }

//         .center {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 16px;
//         }

//         .seat-row {
//           display: flex;
//           gap: 6px;
//           justify-content: center;
//         }

//         .seat {
//           width: 30px;
//           height: 30px;
//           background-color: #e63946;
//           border-radius: 3px;
//           cursor: pointer;
//           transition: background-color 0.2s;
//         }

//         .seat:hover {
//           background-color: #ff6b6b;
//         }

//         .selected {
//           background-color: #2a9d8f !important; /* green for selected */
//         }

//         .pre-selected {
//           background-color: #6c757d !important; /* grey for booked */
//           cursor: not-allowed;
//         }

//         .empty-seat {
//           width: 22px;
//           height: 22px;
//           background-color: transparent;
//         }
//       `}</style>

//       <div className="center">
//         {[...Array(5)].map((_, blockIndex) => (
//           <div key={blockIndex}>
//             {[...Array(5)].map((_, rowIndex) => (
//               <div key={rowIndex} style={{ display: "flex", gap: "6px" }}>
//                 {[...Array(10)].map((_, colIndex) => {
//                   const seatId = `C${blockIndex}-${rowIndex}-${colIndex}`;
//                   return createSeat(seatId);
//                 })}
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default SeatGrid;


// import React from "react";

// const SeatGrid = ({ selectedSeats, onSeatClick, bookedSeats }) => {
//   // Use bookedSeats fetched from backend
//   const toggleSeat = (id) => {
//     // Prevent selecting if seat is already booked
//     if (bookedSeats.includes(id)) return;

//     onSeatClick(id);
//   };

//   const createSeat = (id) => {
//     let seatClass = "seat";
//     if (bookedSeats.includes(id)) seatClass += " pre-selected";
//     else if (selectedSeats.includes(id)) seatClass += " selected";

//     return <div key={id} className={seatClass} onClick={() => toggleSeat(id)} />;
//   };

//   const createEmptySeat = (id) => <div key={id} className="empty-seat" />;

//   return (
//     <>
//       <style>{`
//         body {
//           background-color: #111;
//           display: flex;
//           justify-content: center;
//           align-items: flex-start;
//           min-height: 100vh;
//           margin: 0;
//           padding-top: 30px;
//         }

//         .theatre {
//           display: flex;
//           align-items: flex-start;
//           gap: 20px;
//         }

//         .screen {
//           width: 680px;
//           height: 30px;
//           background-color: #ccc;
//           color: #111;
//           text-align: center;
//           line-height: 30px;
//           font-weight: bold;
//           border-radius: 40% / 100%;
//           margin: 0 auto 20px auto;
//           box-shadow: 0 0 10px #888;
//         }

//         .side-column {
//           display: grid;
//           grid-template-columns: repeat(4, 1fr);
//           gap: 6px 6px;
//         }

//         .center {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 16px;
//         }

//         .seat-row {
//           display: flex;
//           gap: 6px;
//           justify-content: center;
//         }

//         .seat {
//           width: 30px;
//           height: 30px;
//           background-color: #e63946;
//           border-radius: 3px;
//           cursor: pointer;
//           transition: background-color 0.2s;
//         }

//         .seat:hover {
//           background-color: #ff6b6b;
//         }

//         .selected {
//           background-color: #2a9d8f !important; /* green for selected */
//         }

//         .pre-selected {
//           background-color: #6c757d !important; /* grey for booked */
//           cursor: not-allowed;
//         }

//         .empty-seat {
//           width: 22px;
//           height: 22px;
//           background-color: transparent;
//         }
//       `}</style>

//       <div className="theatre">
//         {/* Left side */}
//         <div className="side-column">
//           {Array.from({ length: 23 }).map((_, i) =>
//             Array.from({ length: 4 }).map((_, col) =>
//               i < 5
//                 ? createEmptySeat(`L${i}-${col}`)
//                 : createSeat(`L${i}-${col}`)
//             )
//           )}
//         </div>

//         {/* Center section */}
//         <div className="center">
//           <div className="screen">SCREEN</div>
//           {[1, 2, 5, 2, 3].map((rows, blockIndex) => (
//             <React.Fragment key={blockIndex}>
//               {Array.from({ length: rows }).map((_, r) => (
//                 <div key={r} className="seat-row">
//                   {Array.from({ length: 20 }).map((_, i) =>
//                     createSeat(`C${blockIndex}-${r}-${i}`)
//                   )}
//                 </div>
//               ))}
//               {blockIndex !== 4 && <div style={{ height: "16px" }} />}
//             </React.Fragment>
//           ))}
//         </div>

//         {/* Right side */}
//         <div className="side-column">
//           {Array.from({ length: 23 }).map((_, i) =>
//             Array.from({ length: 4 }).map((_, col) =>
//               i < 5
//                 ? createEmptySeat(`R${i}-${col}`)
//                 : createSeat(`R${i}-${col}`)
//             )
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default SeatGrid;


import React from "react";

const SeatGrid = ({ selectedSeats, bookedSeats, onSeatClick }) => {
  const toggleSeat = (id) => {
    if (bookedSeats.includes(id)) return; // already booked
    onSeatClick(id);
  };

  const createSeat = (id) => {
    let seatClass = "seat";
    if (bookedSeats.includes(id)) seatClass += " pre-selected";
    else if (selectedSeats.includes(id)) seatClass += " selected";

    return <div key={id} className={seatClass} onClick={() => toggleSeat(id)} />;
  };

  return (
    <>
      <style>{`
        body {
          background-color: #111;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          min-height: 100vh;
          margin: 0;
          padding-top: 30px;
        }

        .theatre {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .screen {
          width: 680px;
          height: 30px;
          background-color: #ccc;
          color: #111;
          text-align: center;
          line-height: 30px;
          font-weight: bold;
          border-radius: 40% / 100%;
          margin: 0 auto 20px auto;
          box-shadow: 0 0 10px #888;
        }

        .seat-layout {
          display: flex;
          gap: 80px; /* Center aisle space */
          justify-content: center;
          align-items: flex-start;
        }

        .side-column {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .seat-row {
          display: flex;
          gap: 6px;
          justify-content: center;
        }

        .seat {
          width: 30px;
          height: 30px;
          background-color: #e63946;
          border-radius: 3px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .seat:hover {
          background-color: #ff6b6b;
        }

        .selected {
          background-color: #0febd2ff !important; /* green for selected */
        }

        .pre-selected {
          background-color: #6c757d !important; /* grey for booked */
          cursor: not-allowed;
        }
      `}</style>

      <div className="theatre">
        <div className="screen">SCREEN</div>

        <div className="seat-layout">
          {/* LEFT BAR */}
          <div className="side-column">
            {[...Array(5)].map((_, rowIndex) => (
              <div key={`L-${rowIndex}`} className="seat-row">
                {[...Array(6)].map((_, colIndex) => {
                  const seatId = `L-${rowIndex}-${colIndex}`;
                  return createSeat(seatId);
                })}
              </div>
            ))}
          </div>

          {/* RIGHT BAR */}
          <div className="side-column">
            {[...Array(5)].map((_, rowIndex) => (
              <div key={`R-${rowIndex}`} className="seat-row">
                {[...Array(6)].map((_, colIndex) => {
                  const seatId = `R-${rowIndex}-${colIndex}`;
                  return createSeat(seatId);
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SeatGrid;


