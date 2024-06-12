// import React, { useState } from 'react';
// import InfiniteScroll from 'react-infinite-scroller';

// const Example = () => {
//     const [count, setCount] = useState([])
//     console.log(count)
//     const loadFunc = () =>{
//         for (let index = 0; index < 100; index++) {
//            setCount(index);
            
//         }
//     }
//     return (
//         <div>
//             hello
//             <InfiniteScroll
//                 pageStart={0}
//                 loadMore={loadFunc}
//                 // children={0}
//                 hasMore={true || false}
//                 loader={<div className="loader" key={0}>Loading ...</div>}
//             >
//                 {/* {
//                     count?.map((c, ind) => <p key={ind}>count -{c}</p>)
//                 } */}
//             </InfiniteScroll>
//         </div>
//     );
// };

// export default Example;