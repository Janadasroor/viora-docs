"use client";

import Fuse from "fuse.js";

export interface SearchResult {
  title: string;
  href: string;
  section: string;
  keywords: string;
}

export const searchIndex: SearchResult[] = [
  { title: "Introduction", href: "/docs/getting-started", section: "Getting Started", keywords: "Viora EDA overview what is schematic capture PCB layout SPICE simulation firmware AI circuit optimization projects VioraEDA VioAVR FluxScript VioMATRIXC system requirements quick install first simulation RC transient community contributing" },
  { title: "Installation", href: "/docs/getting-started/installation", section: "Getting Started", keywords: "install build prerequisites Linux macOS Windows CMake C++20 Ninja VioAVR VioraEDA FluxScript clone compile" },
  { title: "Quick Start", href: "/docs/getting-started/quickstart", section: "Getting Started", keywords: "quick start tutorial first schematic simulation PCB layout beginner guide" },
  { title: "VioAVR Overview", href: "/docs/vioavr", section: "VioAVR", keywords: "AVR instruction set simulator ISS cycle-accurate C++20 JTAG GDB SPICE co-simulation features MCU ATmega ATtiny AT90 AVR-Dx AVR-Ex XMEGA JIT compilation peripherals GPIO timers UART SPI TWI ADC DAC" },
  { title: "Architecture", href: "/docs/vioavr/architecture", section: "VioAVR", keywords: "architecture core components AvrCpu MemoryBus DeviceDescriptor Machine SyncEngine C++20 concepts constexpr coroutines memory map flash SRAM IO registers EEPROM interrupt model pin multiplexing JIT compiler block cache mmap GDB stub remote serial protocol debugging" },
  { title: "Peripherals", href: "/docs/vioavr/peripherals", section: "VioAVR", keywords: "peripherals GPIO ports timers 8-bit 16-bit TCA TCB TCD TCE XMEGA UART USART EUSART LIN SPI TWI I2C USI ADC DAC analog comparator EEPROM watchdog RTC USB CAN DMA event system CCL HC-05 Bluetooth LCD PSC opamp ZCD" },
  { title: "Co-Simulation", href: "/docs/vioavr/cosimulation", section: "VioAVR", keywords: "co-simulation SPICE ngspice mixed-signal analog digital shared memory sync engine XSPICE code model bridge" },
  { title: "CLI Tools", href: "/docs/vioavr/cli", section: "VioAVR", keywords: "CLI command line tools vioavr-cli bridge daemon device descriptor utilities simulation flash HEX file" },
  { title: "Supported MCUs", href: "/docs/vioavr/supported-mcus", section: "VioAVR", keywords: "MCU support list ATmega ATtiny AT90 AVR-Dx AVR-Ex AVR-Lx AVR-Sx XMEGA 211 variants device compatibility" },
  { title: "VioraEDA Overview", href: "/docs/vioraeda", section: "VioraEDA", keywords: "VioraEDA EDA electronic design automation schematic PCB layout SPICE simulation Qt6 C++20 AI co-pilot Gemini modular architecture core schematic pcb simulator symbols footprints ui python" },
  { title: "Schematic Editor", href: "/docs/vioraeda/schematic", section: "VioraEDA", keywords: "schematic editor component types hierarchical sheets wire routing netlist generation ERC" },
  { title: "PCB Editor", href: "/docs/vioraeda/pcb", section: "VioraEDA", keywords: "PCB layout board design copper pours auto-router DRC engine Gerber export 3D preview" },
  { title: "Simulator", href: "/docs/vioraeda/simulator", section: "VioraEDA", keywords: "SPICE simulator DC AC transient noise THD optimization MNA matrix solver waveform viewer oscilloscope measurements" },
  { title: "AI Co-Pilot", href: "/docs/vioraeda/ai", section: "VioraEDA", keywords: "AI co-pilot Gemini ERC DRC debugging MCP model context protocol ML training pipeline dataset" },
  { title: "Extensions", href: "/docs/vioraeda/extensions", section: "VioraEDA", keywords: "extensions plugins FluxScript scripting automation custom tools" },
  { title: "FluxScript Overview", href: "/docs/fluxscript", section: "FluxScript", keywords: "FluxScript scripting language JIT-compiled circuit simulation SI unit dimensional analysis LLVM ORC profile-guided optimization SIMD vectorization self-hosting compiler toolchain CLI examples" },
  { title: "Language Reference", href: "/docs/fluxscript/language", section: "FluxScript", keywords: "language reference types primitives double float int bool string complex fixed matrix vector SI units variables functions control flow OOP struct enum class trait generics references lifetimes async await generators operators circuit DSL symbolic math AI ML primitives mixed-signal FSM" },
  { title: "Standard Library", href: "/docs/fluxscript/stdlib", section: "FluxScript", keywords: "standard library math signal processing array API FFT filter convolution statistics" },
  { title: "CLI Tools", href: "/docs/fluxscript/cli", section: "FluxScript", keywords: "CLI tools flux fluxc flux-repl flux-pkg flux-lsp flux-spice flux-run flux-doctor flux-sweep flux-fft flux-format flux-doc flux-test flux-instrument flux-optimize flux-worstcase flux-stability flux-monte-carlo" },
  { title: "Qt GUI Bridge", href: "/docs/fluxscript/qt", section: "FluxScript", keywords: "Qt GUI bridge fluxqt widgets layout signals slots OpenGL hot reload UI extensions" },
  { title: "Extensions & Plugins", href: "/docs/fluxscript/plugins", section: "FluxScript", keywords: "extensions plugins C++ plugin system VSCode extension LSP package manager flux-pkg" },
  { title: "FerroMNA Overview", href: "/docs/ferromna", section: "FerroMNA", keywords: "FerroMNA SPICE circuit simulation Rust MNA modified nodal analysis DC AC transient harmonic balance noise sensitivity pole-zero FFT optimization Monte Carlo X-parameter mixed-signal" },
  { title: "Features", href: "/docs/ferromna/features", section: "FerroMNA", keywords: "features device models MOSFET BSIM BJT diode JFET VDMOS netlist parser subcircuit egui GUI FluxScript JIT WAV export" },
  { title: "CLI Reference", href: "/docs/ferromna/cli", section: "FerroMNA", keywords: "CLI reference command line ferromna simulation options analysis modes" },
  { title: "Getting Started", href: "/docs/ferromna/getting-started", section: "FerroMNA", keywords: "getting started install build cargo run simulation examples quick start" },
  { title: "VioMATRIXC Overview", href: "/docs/viomatrixc", section: "VioMATRIXC", keywords: "VioMATRIXC ngspice fork SPICE LTspice compatibility WAVEFILE audio simulation A-device transforms libngspice shared static library" },
  { title: "LTspice Compatibility", href: "/docs/viomatrixc/ltspice", section: "VioMATRIXC", keywords: "LTspice compatibility vicompat A-device transforms OTA COUNTER MODULATOR SAMPLEHOLD VARISTOR WAVEFILE directive netlist syntax" },
  { title: "Build Instructions", href: "/docs/viomatrixc/build", section: "VioMATRIXC", keywords: "build instructions prerequisites compile configure make install cross-platform Linux macOS GCC Clang" },
  { title: "VioAVR Core API", href: "/docs/api/vioavr-core", section: "API Reference", keywords: "API reference VioAVR core library C++ interface headers" },
  { title: "FluxScript Extensions API", href: "/docs/api/fluxscript-extensions", section: "API Reference", keywords: "API reference FluxScript extensions plugin interface C++ FFI" },
  { title: "Python Bindings", href: "/docs/api/python", section: "API Reference", keywords: "Python bindings nanobind C++ Python API simulation scripting" },
];
