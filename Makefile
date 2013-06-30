initialise:
	rm -rf fixtures
	mkdir fixtures
	mkdir fixtures/files
	tools/generate-files.sh

benchmark:
	node scenarios/list-processing/index.js

.PHONY: benchmark
