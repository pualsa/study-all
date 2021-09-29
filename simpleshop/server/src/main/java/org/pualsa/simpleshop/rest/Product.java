package org.pualsa.simpleshop.rest;

import lombok.Data;

@Data
public class Product {
	private Long id;
	private String title;
	private double price;
	private String description;
}
