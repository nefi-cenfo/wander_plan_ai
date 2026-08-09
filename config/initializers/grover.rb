Grover.configure do |config|
  config.options = {
    format: "A4",
    margin: { top: "15mm", bottom: "15mm", left: "12mm", right: "12mm" },
    print_background: true,
    prefer_css_page_size: true
  }
end
