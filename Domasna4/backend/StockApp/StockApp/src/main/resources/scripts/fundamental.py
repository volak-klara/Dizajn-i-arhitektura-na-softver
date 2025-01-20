import pandas as pd
import numpy as np
from datetime import datetime

# Dictionary of company codes from MSE
CODES = {
    'Адинг АД Скопје': 'ADIN',
    'Алкалоид АД Скопје': 'ALK',
    'Ангропромет Тиквешанка АД Кавадарци': 'APTK',
    'Аутомакедонија АД Скопје': 'AUTM',
    'БИМ АД Свети Николе': 'BIM',
    'Централна кооперативна банка АД Скопје': 'CKB',
    'Факом АД Скопје': 'FAKO',
    'Фабрика Карпош АД Скопје': 'FKAR',
    'Фершпед АД Скопје': 'FERS',
    'Гранит АД Скопје': 'GRNT',
    'ГТЦ АД Скопје': 'GTC',
    'Комерцијална Банка АД Скопје': 'KMB',
    'Макстил АД Скопје': 'MAKS',
    'Мода АД Свети Николе': 'MODA',
    'Македонски Телеком АД Скопје': 'TEL',
    'Макпетрол АД Скопје': 'MPT',
    'ОКТА АД Скопје': 'OKTA',
    'Раде Кончар - Апаратна техника АД Скопје': 'RZRA',
    'Реплек АД Скопје': 'REPL',
    'ТЕАЛ АД Тетово': 'TEAL',
    'ТТК Банка АД Скопје': 'TTK',
    'УНИ Банка АД Скопје': 'UNI',
    'Цементарница УСЈЕ АД Скопје': 'USJE'
}


def calculate_fundamental_metrics(df):
    """Calculate fundamental analysis metrics"""

    # Initialize the analysis DataFrame
    analysis = pd.DataFrame()

    # Group by company
    company_groups = df.groupby('Company')

    # Calculate metrics for each company
    metrics = []
    for company, group in company_groups:
        # Price metrics
        price_data = {
            'Company': company,
            'Code': CODES.get(company, 'N/A'),
            'Last_Price': group['PoslednaCena'].iloc[-1],
            'Avg_Price': group['ProsecnaCena'].mean(),
            'Price_Volatility': group['PoslednaCena'].std(),
            'Price_Change_Pct': group['Price Change %'].mean(),

            # Volume metrics
            'Avg_Volume': group['Kolicina'].mean(),
            'Total_Volume': group['Kolicina'].sum(),
            'Total_Turnover': group['Promet'].sum(),

            # Trading activity
            'Trading_Days': len(group),
            'News_Count': len(group['Title'].unique()),

            # Price range
            'Price_Max': group['Max'].max(),
            'Price_Min': group['Min'].min(),

            # Date range
            'First_Date': group['Date'].min(),
            'Last_Date': group['Date'].max()
        }

        # Calculate liquidity ratio
        price_data['Liquidity_Ratio'] = price_data['Total_Volume'] / len(group)

        # Calculate price momentum (rate of price change)
        price_data['Price_Momentum'] = price_data['Price_Change_Pct'] / len(group)

        # Trading frequency score (0-1)
        price_data['Trading_Frequency'] = len(group[group['Kolicina'] > 0]) / len(group)

        metrics.append(price_data)

    analysis = pd.DataFrame(metrics)

    # Calculate market activity score
    analysis['Market_Activity_Score'] = (
            (analysis['Trading_Frequency'] * 0.4) +
            (analysis['Liquidity_Ratio'] / analysis['Liquidity_Ratio'].max() * 0.3) +
            (analysis['News_Count'] / analysis['News_Count'].max() * 0.3)
    )

    # Calculate fundamental score
    analysis['Fundamental_Score'] = (
            (np.clip(analysis['Price_Change_Pct'], -10, 10) / 10 * 0.3) +
            (analysis['Market_Activity_Score'] * 0.4) +
            (analysis['Trading_Frequency'] * 0.3)
    )

    # Generate recommendations
    def get_recommendation(row):
        score = row['Fundamental_Score']
        activity = row['Market_Activity_Score']
        price_change = row['Price_Change_Pct']
        news_sentiment = row['News_Count'] / analysis['News_Count'].max()

        # For low activity stocks, focus more on price change and news
        if activity < 0.2:
            if price_change > 2 or news_sentiment > 0.7:
                return "BUY"
            elif price_change < -2 or news_sentiment < 0.3:
                return "SELL"
            return "HOLD"

        # For active stocks
        if score > 0.6 and activity > 0.5:
            return "STRONG BUY"
        elif score > 0.3:
            return "BUY"
        elif score < -0.6 and activity > 0.5:
            return "STRONG SELL"
        elif score < -0.3:
            return "SELL"
        return "HOLD"

    analysis['Recommendation'] = analysis.apply(get_recommendation, axis=1)

    return analysis


# Read and prepare data
df = pd.read_csv('merged_data.csv', encoding='utf-8')

# Perform analysis
fundamental_analysis = calculate_fundamental_metrics(df)

# Select and reorder columns for final output
columns_order = [
    'Code',
    'Company',
    'Last_Price',
    'Price_Change_Pct',
    'Avg_Price',
    'Price_Max',
    'Price_Min',
    'Price_Volatility',
    'Avg_Volume',
    'Total_Turnover',
    'Trading_Days',
    'Trading_Frequency',
    'Market_Activity_Score',
    'Fundamental_Score',
    'News_Count',
    'First_Date',
    'Last_Date',
    'Recommendation'
]

# Sort by Fundamental Score
final_analysis = fundamental_analysis[columns_order].sort_values('Fundamental_Score', ascending=False)

# Round numeric columns to 2 decimal places
numeric_columns = final_analysis.select_dtypes(include=[np.number]).columns
final_analysis[numeric_columns] = final_analysis[numeric_columns].round(2)

# Save to CSV
final_analysis.to_csv('fundamental_analysis_results.csv', index=False, encoding='utf-8')

print("Analysis completed and saved to 'fundamental_analysis_results.csv'")
print(f"Number of companies analyzed: {len(final_analysis)}")