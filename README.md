# GitHub Action to Setup CIRCT/firtool for Chisel Projects

![Build & Test](https://github.com/zhutmost/setup-circt/actions/workflows/ci.yml/badge.svg)

Use this action to setup [LLVM-CIRCT](https://github.com/llvm/circt) available in a job.

## Usage

```yaml
- uses: zhutmost/setup-circt@main
  with:
    version: 1.122.0 # Specify the version of CIRCT to use
- ...
```
