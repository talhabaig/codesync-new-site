// This component is for getting plane text from clipboard in blog editor (no formatting/styles of coppied text)
"use client";
import React, { useEffect } from "react";
import Quill from 'quill';
class CustomClipboard extends Quill.import('modules/clipboard') {
  onPaste(e: ClipboardEvent) {
    e.preventDefault();
    const clipboardData = e.clipboardData;

    if (clipboardData) {
      const text = clipboardData.getData('text/plain');

      const range = this.quill.getSelection();
      if (range) {
        this.quill.insertText(range.index, text, 'user');
      }
    }
  }
}

const useCustomClipboard = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Quill.register('modules/clipboard', CustomClipboard);
    }
  }, []);
};

export default useCustomClipboard;


