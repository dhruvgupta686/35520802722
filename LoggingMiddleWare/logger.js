export async function Log(stack, level, pkg, message) {
    const payload = {
      stack,
      level,
      package: pkg,
      message,
    };
  
      const res = await fetch("http://1.244.56.144/evaluation-service/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const val = await res.json();
  
      if (!res.ok) {
        console.error("Log failed ", val);
      } else {
        console.info("Log created ", val.message);
      }
    
  }  