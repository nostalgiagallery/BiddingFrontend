export default function calculateTimeRemaining(product, setterFunction) {
    const intervalId = setInterval(() => {
      const now = new Date();
      const endTime = new Date(`${product?.Date}T${product?.Time}`);
      endTime.setMinutes(endTime.getMinutes() + (product?.duration || 30));
  
      if (now >= endTime) {
        setterFunction("Bid Ended");
        clearInterval(intervalId);
      } else {
        const timeDiff = endTime - now;
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        setterFunction(`${hours}:${minutes}:${seconds}`);
      }
    }, 1000);
  }
  