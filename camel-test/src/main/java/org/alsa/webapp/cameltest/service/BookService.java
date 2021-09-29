package org.alsa.webapp.cameltest.service;

import java.util.Collection;

import org.alsa.webapp.cameltest.model.Book;

public interface BookService {
	Collection<Book> getBooks();

	Book addBook(Book book);
}
