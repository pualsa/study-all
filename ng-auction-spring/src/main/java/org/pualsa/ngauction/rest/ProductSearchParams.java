package org.pualsa.ngauction.rest;

import lombok.Data;

@Data
public class ProductSearchParams {
	private String title = "";
	private double minPrice = Double.MIN_VALUE;
	private double maxPrice = Double.MAX_VALUE;
}
