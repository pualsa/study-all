package org.alsa.firstdemo.websocket;

import lombok.Data;

@Data
public class BidMessage {
	private long productId;
	private double price;
}
