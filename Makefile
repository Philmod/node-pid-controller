MOCHA_OPTS=
REPORTER = dot

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		$(MOCHA_OPTS)

test-w:
  @NODE_ENV=test ./node_modules/.bin/mocha \
    --reporter $(REPORTER) \
    --growl \
    --watch \
    $(MOCHA_OPTS)

.PHONY: test test-w