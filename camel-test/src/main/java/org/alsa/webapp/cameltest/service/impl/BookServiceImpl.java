package org.alsa.webapp.cameltest.service.impl;

import java.util.ArrayList;
import java.util.Collection;

import org.alsa.webapp.cameltest.model.Book;
import org.alsa.webapp.cameltest.service.BookService;
import org.springframework.stereotype.Service;

@Service
public class BookServiceImpl implements BookService {

	@Override
	public Collection<Book> getBooks() {
		Collection<Book> books = new ArrayList<>();
		books.add(createBook("a"));
		books.add(createBook("b"));
		books.add(createBook("c"));
		return books;
	}

	private Book createBook(String name) {
		Book book = new Book();
		book.setName(name);
		return book;
	}

	@Override
	public Book addBook(Book book) {
		// TODO Auto-generated method stub
		return null;
	}

}
