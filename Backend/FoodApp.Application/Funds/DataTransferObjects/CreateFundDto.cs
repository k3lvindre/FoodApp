namespace FoodApp.Application.Funds.DataTransferObjects
{
    public record CreateFundDto(string Description, 
        decimal Amount,
        int ProductCategoryId);
}