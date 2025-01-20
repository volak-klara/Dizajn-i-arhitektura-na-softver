# Домашна 4

## Објаснување на шаблоните
Во финалната домашна имавме задача да имплементираме дизајн-шаблони, со цел подобар изглед на кодот. Во нашиот проект употребени се **SINGLETON** и **FACTORY** Pattern.

### Singleton

Секоја класа означена со анотации како __@Component__, __@Service__, __@Controller__, __@Repository__ и слично се регистрира како Bean во _Spring Inversion of Control_ контејнерот, кој создава единствена инстанца од тој Bean и ја користи на сите места каде што е потребна во апликацијата.
Ова соодветствува со дефиницијата за шаблонот Singleton, па така „несвесно“ го употребуваме истиот.

### Factory
Factory шаблонот го применуваме преку класата AnalysisFactory, која инкапсулира логика за креирање и враќање на соодветната имплементација на интерфејсот AnalysisService врз основа на параметарот type. 

```java
@Component
public class AnalysisFactory {

    @Autowired
    private TechAnalysisService techAnalysisService;

    @Autowired
    private FundamentalAnalysisService fundamentalAnalysisService;
    @Autowired
    private LSTMAnalysisService lstmAnalysisService;

    public AnalysisService getAnalysisService(String type) {
        switch (type.toLowerCase()) {
            case "tech":
                return techAnalysisService;
            case "fund":
                return fundamentalAnalysisService;
            case "lstm":
                return lstmAnalysisService;
            default:
                throw new IllegalArgumentException("Invalid analysis type: " + type);
        }
    }
}
```

Наместо контролерот директно да ги создава објектите за различните сервиси (_TechAnalysisService_, _FundamentalAnalysisService_, _LSTMAnalysisService_),
тој ја користи фабриката за оваа цел. Ова го декоуплира контролерот од специфичните имплементации, ја централизира логиката за избор на сервис, и го прави кодот полесно одржлив и проширлив. 
Додавањето нова имплементација бара само ажурирање на фабриката, без промени во контролерот.

```java
 @GetMapping("/analysis")
    public ResponseEntity<String> getAnalysis(@RequestParam String companyName, @RequestParam String type) {
        try {
            String csvFilePath = null;
            if(type.equals("tech")) {
                 csvFilePath = "src/main/resources/companies/" + companyName + ".csv";
            }else if(type.equals("fund")){
                 csvFilePath = "src/main/resources/companiesFund/" + companyName + ".csv";
            }else if(type.equals("lstm")){
                csvFilePath = "src/main/resources/companiesLSTM/" + companyName + ".csv";
            }
            AnalysisService analysisService = analysisFactory.getAnalysisService(type);
            String result = analysisService.performAnalysis(csvFilePath);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error in analysis: " + e.getMessage());
        }
    }
```


## Микросервис

Во склоп на домашна 4 се наоѓа и папката „analysis-service“ поставена во овој репозиториум. Оваа папка содржи посебен Spring проект, што требаше да претставува микросервис, кој ќе се справува со техничката анализа,
меѓутоа поради минорни грешки во кодот, не успеавме целосно да ги усовршиме функционалностите, со цел да комуницира со главниот проект.


