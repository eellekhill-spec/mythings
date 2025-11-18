<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flight Tracker - Canada, Mexico, Europe, Africa</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <div class="container">
        <header>
            <div class="header-content">
                <h1>✈️ Flight Tracker</h1>
                <p class="subtitle">Real-time flights to Canada, Mexico, Europe & Africa</p>
            </div>
        </header>

        <main>
            <!-- Controls -->
            <div class="controls">
                <button id="fetchBtn" class="btn btn-primary">
                    <span class="btn-icon">🔄</span>
                    Fetch Flights
                </button>
                <button id="exportBtn" class="btn btn-secondary" disabled>
                    <span class="btn-icon">💾</span>
                    Export JSON
                </button>
                <div class="limit-control">
                    <label for="limitSelect">Results:</label>
                    <select id="limitSelect">
                        <option value="50">50 flights</option>
                        <option value="100" selected>100 flights</option>
                    </select>
                </div>
            </div>

            <!-- Loading State -->
            <div id="loading" class="loading hidden">
                <div class="spinner"></div>
                <p>Fetching flight data...</p>
            </div>

            <!-- Error State -->
            <div id="error" class="error hidden">
                <div class="error-icon">⚠️</div>
                <h3>Error</h3>
                <p id="errorMessage"></p>
            </div>

            <!-- Statistics -->
            <div id="stats" class="stats hidden">
                <div class="stat-card">
                    <div class="stat-value" id="totalFlights">0</div>
                    <div class="stat-label">Total Flights</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" id="canadaCount">0</div>
                    <div class="stat-label">🇨🇦 Canada</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" id="mexicoCount">0</div>
                    <div class="stat-label">🇲🇽 Mexico</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" id="europeCount">0</div>
                    <div class="stat-label">🇪🇺 Europe</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" id="africaCount">0</div>
                    <div class="stat-label">🌍 Africa</div>
                </div>
            </div>

            <!-- Tabs -->
            <div id="tabs" class="tabs hidden">
                <button class="tab-btn active" data-region="all">All Regions</button>
                <button class="tab-btn" data-region="Canada">🇨🇦 Canada</button>
                <button class="tab-btn" data-region="Mexico">🇲🇽 Mexico</button>
                <button class="tab-btn" data-region="Europe">🇪🇺 Europe</button>
                <button class="tab-btn" data-region="Africa">🌍 Africa</button>
            </div>

            <!-- Results -->
            <div id="results" class="results hidden"></div>
        </main>

        <footer>
            <p>Powered by Aviationstack API | Free tier: 100 requests/month</p>
            <p class="footer-links">
                <a href="https://aviationstack.com" target="_blank">Get API Key</a> |
                <a href="https://github.com" target="_blank">GitHub</a>
            </p>
        </footer>
    </div>

    <script src="/script.js"></script>
</body>
</html>
