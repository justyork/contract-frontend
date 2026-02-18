.PHONY: help install dev build start lint clean

# * Default target
help:
	@echo "Contralytic / Contractor Frontend — Makefile"
	@echo ""
	@echo "Available targets:"
	@echo "  make install        - Install npm dependencies"
	@echo "  make dev           - Start development server"
	@echo "  make build         - Build production bundle"
	@echo "  make start         - Start production server"
	@echo "  make lint          - Run ESLint"
	@echo "  make clean         - Remove node_modules/ and .next/"
	@echo ""

# * Install dependencies
install:
	npm install

# * Development
dev:
	npm run dev

# * Build
build:
	npm run build

# * Production server
start:
	npm start

# * Linting
lint:
	npm run lint

# * Cleanup
clean:
	rm -rf node_modules/
	rm -rf .next/
	rm -rf .turbo/
