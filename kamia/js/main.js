/**
 * AI股票分析应用 - 主JavaScript文件
 * 保持原有功能，重构为模块化、面向对象的方式
 */

class StockAnalysisApp {
  constructor() {
    // DOM元素
    this.elements = {
      modal: document.getElementById('ai-modal'),
      progress: document.getElementById('ai-progress'),
      result: document.getElementById('ai-result'),
      bars: [
        document.getElementById('bar-1'),
        document.getElementById('bar-2'),
        document.getElementById('bar-3')
      ],
      error: document.querySelector('.error'),
      peopleNum: document.getElementById('people_num'),
      stockCode: document.getElementById('stockcode'),
      startBtn: document.getElementById('start-analysis-btn'),
      closeBtn: document.getElementById('close-result-btn'),
      lineBtn: document.getElementById('line-report-btn'),
      tipsCode: document.getElementById('tips-code')
    };
    
    // 状态
    this.isProcessing = false;
    this.userCounter = new UserCounter();
    this.progressController = new ProgressController(this.elements.bars);
    
    // 初始化
    this.init();
  }
  
  init() {
    // 启动用户计数器
    this.userCounter.start(this.elements.peopleNum);
    
    // 绑定事件
    this.bindEvents();
    
    // 添加键盘支持
    this.addKeyboardSupport();
  }
  
  bindEvents() {
    // 开始分析按钮
    this.elements.startBtn.addEventListener('click', () => this.startAnalysis());
    
    // 关闭结果按钮
    this.elements.closeBtn.addEventListener('click', () => this.closeModal());
    
    // Line报告按钮
    this.elements.lineBtn.addEventListener('click', () => gtag_report_conversion());
    
    // 错误提示点击关闭
    this.elements.error.addEventListener('click', () => {
      this.elements.error.style.display = 'none';
    });
  }
  
  addKeyboardSupport() {
    // Enter键提交
    this.elements.stockCode.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.startAnalysis();
      }
    });
    
    // ESC键关闭模态框
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isProcessing) {
        this.closeModal();
      }
    });
  }
  
  startAnalysis() {
    // 防止重复点击
    if (this.isProcessing) return;
    
    // 获取输入的股票代码
    const stockCode = this.elements.stockCode.value.trim();
    
    // 验证输入
    if (!this.validateInput(stockCode)) {
      this.showError();
      return;
    }
    
    // 更新显示股票代码
    if (this.elements.tipsCode) {
      this.elements.tipsCode.textContent = stockCode;
    }
    
    // 开始分析流程
    this.beginAnalysisProcess();
  }
  
  validateInput(input) {
    // 基本验证：非空
    return input && input.length > 0;
  }
  
  showError() {
    this.elements.error.style.display = "flex";
    
    // 3秒后自动隐藏
    setTimeout(() => {
      this.elements.error.style.display = "none";
    }, 3000);
  }
  
  beginAnalysisProcess() {
    this.isProcessing = true;
    
    // 显示模态框
    this.elements.modal.style.display = "flex";
    this.elements.result.style.display = "none";
    
    // 运行进度条
    this.progressController.run(() => {
      // 进度完成后的回调
      this.onProgressComplete();
    });
  }
  
  onProgressComplete() {
    // 隐藏进度条，显示结果
    this.elements.progress.style.display = "none";
    this.elements.result.style.display = "block";
  }
  
  closeModal() {
    // 隐藏所有模态框元素
    this.elements.modal.style.display = "none";
    this.elements.result.style.display = "none";
    this.elements.progress.style.display = "none";
    
    // 重置状态
    this.isProcessing = false;
    this.progressController.reset();
    
    // 清空输入框（可选）
    // this.elements.stockCode.value = '';
  }
}

/**
 * 用户计数器类
 */
class UserCounter {
  constructor() {
    this.count = parseInt(localStorage.getItem('count')) || 18365;
    this.intervalId = null;
    this.updateInterval = 2000; // 2秒更新一次
  }
  
  start(displayElement) {
    if (!displayElement) return;
    
    // 初始显示
    displayElement.textContent = this.count.toLocaleString();
    
    // 计算首次延迟时间
    const now = new Date();
    const milliseconds = now.getMilliseconds();
    const seconds = now.getSeconds();
    const delay = 5000 - ((seconds % 5) * 1000 + milliseconds);
    
    // 设置定时器
    setTimeout(() => {
      this.update(displayElement);
      this.intervalId = setInterval(() => this.update(displayElement), this.updateInterval);
    }, delay);
  }
  
  update(displayElement) {
    if (!displayElement) return;
    
    // 随机增加
    const randomIncrement = Math.floor(Math.random() * 8);
    this.count += randomIncrement;
    
    // 保存到本地存储
    localStorage.setItem('count', this.count);
    
    // 更新显示
    displayElement.textContent = this.count.toLocaleString();
  }
  
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

/**
 * 进度条控制器类
 */
class ProgressController {
  constructor(bars) {
    this.bars = bars;
    this.interval = 30; // 毫秒
    this.duration = 1500; // 总时长
    this.timerId = null;
  }
  
  run(onComplete) {
    // 重置所有进度条
    this.reset();
    
    // 显示进度条容器
    const progressContainer = document.getElementById('ai-progress');
    if (progressContainer) {
      progressContainer.style.display = "block";
    }
    
    let elapsed = 0;
    
    // 开始动画
    this.timerId = setInterval(() => {
      elapsed += this.interval;
      const percent = Math.min(100, Math.round((elapsed / this.duration) * 100));
      
      // 更新各个进度条
      this.updateBars(percent);
      
      // 检查是否完成
      if (elapsed >= this.duration) {
        this.complete(onComplete);
      }
    }, this.interval);
  }
  
  updateBars(percent) {
    if (!this.bars || this.bars.length < 3) return;
    
    // 第一个进度条：线性增长
    this.bars[0].style.width = `${percent}%`;
    
    // 第二个进度条：在33%后开始
    if (percent > 33) {
      this.bars[1].style.width = `${(percent - 33) * 1.5}%`;
    }
    
    // 第三个进度条：在66%后开始
    if (percent > 66) {
      this.bars[2].style.width = `${(percent - 66) * 3}%`;
    }
  }
  
  complete(onComplete) {
    // 停止定时器
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    
    // 确保所有进度条显示100%
    this.bars.forEach(bar => {
      bar.style.width = "100%";
    });
    
    // 执行完成回调
    if (typeof onComplete === 'function') {
      setTimeout(onComplete, 200);
    }
  }
  
  reset() {
    // 停止任何运行的定时器
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    
    // 重置所有进度条为0%
    if (this.bars) {
      this.bars.forEach(bar => {
        bar.style.width = "0%";
      });
    }
  }
}

/**
 * 页面加载完成后初始化应用
 */
document.addEventListener('DOMContentLoaded', () => {
  // 创建应用实例
  window.stockAnalysisApp = new StockAnalysisApp();
});