import pandas as pd
import numpy as np
import ta
import json
import sys

try:
    csv_file_path = sys.argv[1]

    # Читање на CSV
    data = pd.read_csv(csv_file_path)

    def calculate_technical_indicators(data):
        data['SMA_20'] = data['PoslednaCena'].rolling(window=20).mean()
        data['EMA_20'] = data['PoslednaCena'].ewm(span=20, adjust=False).mean()
        data['WMA_20'] = data['PoslednaCena'].rolling(window=20).apply(
            lambda x: np.dot(x, np.arange(1, 21)) / np.sum(np.arange(1, 21)), raw=True)
        data['HMA_20'] = 2 * data['PoslednaCena'].rolling(window=10).mean() - data['PoslednaCena'].rolling(window=20).mean()
        data['TMA_20'] = data['PoslednaCena'].rolling(window=20).mean().rolling(window=20).mean()

        data['RSI'] = ta.momentum.RSIIndicator(data['PoslednaCena']).rsi()
        data['MACD'] = ta.trend.MACD(data['PoslednaCena']).macd()
        data['CCI'] = ta.trend.CCIIndicator(data['Max'], data['Min'], data['PoslednaCena']).cci()
        data['ADX'] = ta.trend.ADXIndicator(data['Max'], data['Min'], data['PoslednaCena']).adx()
        data['Stoch'] = ta.momentum.StochasticOscillator(data['Max'], data['Min'], data['PoslednaCena']).stoch()

        data['Signal'] = 'Hold'
        data.loc[data['RSI'] < 30, 'Signal'] = 'Buy'
        data.loc[data['RSI'] > 70, 'Signal'] = 'Sell'
        data.loc[data['MACD'] > 0, 'Signal'] = 'Buy'
        data.loc[data['MACD'] < 0, 'Signal'] = 'Sell'
        data.loc[data['SMA_20'] > data['EMA_20'], 'Signal'] = 'Buy'
        data.loc[data['SMA_20'] < data['EMA_20'], 'Signal'] = 'Sell'

        signals = data[['Date', 'Signal']].to_dict(orient='records')
        return signals

    results = calculate_technical_indicators(data)
    # Само печатење на JSON резултатот, без дополнителни пораки
    print(json.dumps(results))

except Exception as e:
    error_dict = {"error": str(e)}
    print(json.dumps(error_dict))
    sys.exit(1)