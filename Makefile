build:
	gulp build
	cd dist/; echo "I'm in dist"; \
		cf push; \
		cd ../
