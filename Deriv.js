import WebSocket from "ws";

/**
 * Faz uma chamada à API Deriv via WebSocket e devolve a resposta.
 */
export function derivCall(token, request) {
  return new Promise((resolve, reject) => {
    const APP_ID = process.env.APP_ID || "36544"; // app_id pública da Deriv para WS
    const ws = new WebSocket(`wss://ws.binaryws.com/websockets/v3?app_id=${APP_ID}&l=PT`);

    const timeout = setTimeout(() => {
      ws.close();
      reject(new Error("WebSocket timeout"));
    }, 10000);

    ws.on("open", () => {
      ws.send(JSON.stringify({ authorize: token }));
    });

    ws.on("message", (data) => {
      const msg = JSON.parse(data);

      if (msg.msg_type === "authorize") {
        if (msg.error) {
          clearTimeout(timeout);
          ws.close();
          return reject(new Error(msg.error.message));
        }
        // Após autorizar, envia o pedido real
        ws.send(JSON.stringify(request));
      } else if (msg.msg_type === request.msg_type || Object.keys(request)[0] === msg.msg_type) {
        clearTimeout(timeout);
        ws.close();
        resolve(msg);
      }
    });

    ws.on("error", (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}
