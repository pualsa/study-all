package org.alsa.firstdemo.websocket;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import org.alsa.firstdemo.db.ProductStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class SocketHandler extends TextWebSocketHandler {
	private List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();
	private int messagecount = 0;

	private ProductStore store;

	public SocketHandler(ProductStore store) {
		this.store = store;
	}

	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message)
			throws InterruptedException, IOException {

		// parse message
		ObjectMapper mapper = new ObjectMapper();
		BidMessage bidMessage = mapper.readValue(message.getPayload(), BidMessage.class);
		double price = store.updatePrice(bidMessage.getProductId(), bidMessage.getPrice());
		bidMessage.setPrice(price);
		String payload = mapper.writeValueAsString(bidMessage);

		// send message to all sessions
		for (WebSocketSession webSocketSession : sessions) {
			webSocketSession.sendMessage(new TextMessage(payload));
		}
	}

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		// the messages will be broadcasted to all users.
		sessions.add(session);
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
		// do something on connection closed
		sessions.remove(session);
	}

	@Override
	protected void handleBinaryMessage(WebSocketSession session, BinaryMessage message) {
		// handle binary message
	}

	@Override
	public void handleTransportError(WebSocketSession session, Throwable exception) {
		// handle transport error
	}
}