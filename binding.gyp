{
  "targets": [{
    "target_name": "rubicube_native",
    "cflags!": [ "-fno-exceptions" ],
    "cflags_cc!": [ "-fno-exceptions" ],
    "sources": [
      "src/main.cc"
    ],
    'include_dirs': [],
    'libraries': [],
    'dependencies': [],
  }]
}
