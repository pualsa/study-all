package org.pualsa.ngauction.db;

import java.util.Set;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * <pre>
 *   {
    "id": 1,
    "description" : "Isn’t it cool when things look old, but their not. Looks Old But Not makes awesome vintage goods that are super smart. This ol’ radio just got an upgrade. Connect to it with an app and jam out to some top forty.",
    "imageUrl" : "data/img/radio.png",
    "price" : 300,
    "title" : "Vintage Bluetooth Radio",
    "categories": [
      "household"
    ]
  },
 * </pre>
 *
 */
@Data
@NoArgsConstructor
public class Product {
	private long id;
	private String title;
	private String description;
	private String imageUrl;
	private double price;
	private boolean featured;
	private Set<String> categories;

}
