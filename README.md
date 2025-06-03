# Softball Banquet Photo Gallery

This project is a simple, static photo gallery and slideshow for a softball banquet, built with HTML, CSS, and JavaScript. Images are organized by team and loaded dynamically from a JSON file.

https://neilfrancese.github.io/sc-banquet-presentation/

---

## 📦 Project Structure

```
index.html
script.js
styles.css
generate_image_list.py
resources/
  images/
    collages.json
    varsity/
    jv/
    mod9/
    mod/
    watermarks/
```

---

## 🚀 Running Locally with Python

You can use Python's built-in HTTP server to run the site locally:

### 1. Open a terminal and navigate to the project folder:

```powershell
cd C:\Users\neil\GitHub\sc-banquet-presentation
```

### 2. Start the server (Python 3):

```powershell
python -m http.server
```

By default, this will serve your site at [http://localhost:8000/](http://localhost:8000/).

- Open your browser and go to: `http://localhost:8000/`
- The slideshow will load automatically.

---

## 🌐 Deploying to GitHub Pages

You can host this static site for free using GitHub Pages.

### 1. Push your code to a GitHub repository
Make sure all files (including the `resources` folder and its contents) are committed and pushed.

### 2. Enable GitHub Pages
- Go to your repository on GitHub.
- Click **Settings** > **Pages**.
- Under **Source**, select your branch (usually `main`) and set the folder to `/ (root)`.
- Click **Save**.

### 3. Access your site
After a few minutes, your site will be available at:
```
https://<your-username>.github.io/<your-repo-name>/
```

- All images and the JSON file will load as long as the folder structure is preserved.
- No server-side code is needed; everything is static.

---

## 📝 Notes
- If you add or remove images, re-run `generate_image_list.py` to update `collages.json`.
- The slideshow supports fullscreen mode and maintains a 16:9 aspect ratio.
- For any issues, check the browser console for errors.

---

Enjoy your photo gallery!

---
