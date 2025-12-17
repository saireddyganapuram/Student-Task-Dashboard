import streamlit as st
from pathlib import Path

st.set_page_config(
    page_title="Student Task Dashboard",
    layout="wide",
)

html_file = Path("inde.html").read_text(encoding="utf-8")

st.components.v1.html(html_file,height=900,scrolling=True)